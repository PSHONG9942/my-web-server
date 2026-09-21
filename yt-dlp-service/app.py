import os
import shutil
import time
import uuid
import threading
import asyncio
from typing import Optional, Dict, Any
from pathlib import Path
from urllib.parse import quote

from fastapi import FastAPI, HTTPException, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

import yt_dlp

app = FastAPI(
    title="yt-dlp Media Downloader API",
    description="High-performance backend for parsing and downloading video/audio via yt-dlp & ffmpeg",
    version="1.2.0"
)

# Enable CORS for all origins (supports local development, Cloudflare Pages, ngrok, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
DOWNLOADS_DIR = BASE_DIR / "downloads"
DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)

LOGS_DIR = BASE_DIR / "logs"
LOGS_DIR.mkdir(parents=True, exist_ok=True)
AUDIT_LOG_FILE = LOGS_DIR / "downloads.log"

def log_audit_event(url: str, title: str, format_type: str, quality: str, file_size: int, client_ip: str):
    """Logs download activity for security, abuse monitoring, and traffic audit."""
    try:
        now_str = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        size_mb = f"{file_size / (1024 * 1024):.2f} MB" if file_size else "--"
        log_entry = (
            f"[{now_str}] IP: {client_ip} | "
            f"格式: {format_type.upper()} ({quality}) | "
            f"大小: {size_mb} | "
            f"标题: {title} | "
            f"网址: {url}\n"
        )
        with open(AUDIT_LOG_FILE, "a", encoding="utf-8") as f:
            f.write(log_entry)
    except Exception as e:
        print(f"[Audit Log Error] {e}")

# In-memory stores
tasks: Dict[str, Dict[str, Any]] = {}
cache_store: Dict[str, str] = {}  # cache_key -> task_id


# Retention policies: 30 minutes safety buffer & 5GB quota
CACHE_TTL_SECONDS = 1800  # 30 minutes
MAX_STORAGE_BYTES = 5 * 1024 * 1024 * 1024  # 5 GB

class InfoRequest(BaseModel):
    url: str

class DownloadRequest(BaseModel):
    url: str
    format_type: str = "video"  # "video" or "audio"
    quality: str = "best"       # "best", "1080p", "720p", "480p", "360p", "320k", "192k"

def get_cache_key(url: str, format_type: str, quality: str) -> str:
    return f"{format_type.strip().lower()}_{quality.strip().lower()}_{url.strip()}"

def format_duration(seconds: Optional[int]) -> str:
    if not seconds:
        return "未知"
    m, s = divmod(int(seconds), 60)
    h, m = divmod(m, 60)
    if h > 0:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"

def get_dir_size(path: Path) -> int:
    total = 0
    try:
        for entry in path.rglob('*'):
            if entry.is_file():
                total += entry.stat().st_size
    except Exception:
        pass
    return total

def cleanup_old_files():
    """
    Cleans up files:
    1. Purges tasks older than 30 minutes.
    2. Enforces LRU quota if downloads folder exceeds 5GB.
    """
    try:
        now = time.time()
        # 1. Purge expired task directories (> 30 min)
        for item in list(DOWNLOADS_DIR.iterdir()):
            if item.is_dir() and (now - item.stat().st_mtime > CACHE_TTL_SECONDS):
                shutil.rmtree(item, ignore_errors=True)

        # 2. Enforce total storage cap (LRU: remove oldest if > 5GB)
        total_size = get_dir_size(DOWNLOADS_DIR)
        if total_size > MAX_STORAGE_BYTES:
            dirs = [d for d in DOWNLOADS_DIR.iterdir() if d.is_dir()]
            dirs.sort(key=lambda d: d.stat().st_mtime)  # Oldest first
            for d in dirs:
                shutil.rmtree(d, ignore_errors=True)
                total_size = get_dir_size(DOWNLOADS_DIR)
                if total_size <= (MAX_STORAGE_BYTES * 0.6):  # Reduced to 60%
                    break

        # 3. Clean up in-memory task records
        dead_tasks = []
        for tid, t in tasks.items():
            if now - t.get("created_at", 0) > CACHE_TTL_SECONDS:
                dead_tasks.append(tid)
        for tid in dead_tasks:
            tasks.pop(tid, None)

        # 4. Clean up cache store
        dead_cache = [k for k, tid in cache_store.items() if tid not in tasks]
        for k in dead_cache:
            cache_store.pop(k, None)

    except Exception as e:
        print(f"[Cleanup Error] {e}")

@app.get("/api/status")
async def get_status():
    ffmpeg_path = shutil.which("ffmpeg")
    return {
        "status": "online",
        "yt_dlp_version": yt_dlp.version.__version__,
        "ffmpeg_available": ffmpeg_path is not None,
        "ffmpeg_path": ffmpeg_path or "Not found",
        "cache_count": len(cache_store),
        "timestamp": time.time()
    }

@app.post("/api/info")
async def extract_info(req: InfoRequest):
    if not req.url or not req.url.strip():
        raise HTTPException(status_code=400, detail="URL 不能为空")

    cleanup_old_files()

    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "extract_flat": False,
        "socket_timeout": 20,
    }

    def _extract():
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            return ydl.extract_info(req.url.strip(), download=False)

    try:
        info = await asyncio.to_thread(_extract)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"解析失败: {str(e)}")

    if not info:
        raise HTTPException(status_code=404, detail="无法获取视频信息")

    # Extract available video resolutions
    available_resolutions = set()
    has_audio = False
    formats = info.get("formats", [])
    for f in formats:
        h = f.get("height")
        if h:
            available_resolutions.add(h)
        if f.get("acodec") and f.get("acodec") != "none":
            has_audio = True

    sorted_res = sorted(list(available_resolutions), reverse=True)

    return {
        "id": info.get("id"),
        "title": info.get("title", "未知标题"),
        "thumbnail": info.get("thumbnail"),
        "duration": info.get("duration"),
        "duration_formatted": format_duration(info.get("duration")),
        "uploader": info.get("uploader") or info.get("channel") or "未知作者",
        "uploader_url": info.get("uploader_url"),
        "view_count": info.get("view_count"),
        "webpage_url": info.get("webpage_url", req.url),
        "available_resolutions": sorted_res,
        "has_audio": has_audio,
    }

def run_download_task(task_id: str, url: str, format_type: str, quality: str, cache_key: str, client_ip: str = "unknown"):
    task_dir = DOWNLOADS_DIR / task_id
    task_dir.mkdir(parents=True, exist_ok=True)

    outtmpl = str(task_dir / "%(title).200B.%(ext)s")

    def progress_hook(d):
        if d.get("status") == "downloading":
            total_bytes = d.get("total_bytes") or d.get("total_bytes_estimate") or 0
            downloaded = d.get("downloaded_bytes", 0)
            percent = (downloaded / total_bytes * 100) if total_bytes > 0 else 0
            
            speed = d.get("speed")
            speed_str = f"{speed / (1024 * 1024):.2f} MB/s" if speed else "--"
            
            eta = d.get("eta")
            eta_str = f"{eta}s" if eta is not None else "--"

            tasks[task_id].update({
                "status": "downloading",
                "progress": round(percent, 1),
                "speed": speed_str,
                "eta": eta_str,
                "downloaded_bytes": downloaded,
                "total_bytes": total_bytes
            })
        elif d.get("status") == "finished":
            tasks[task_id].update({
                "status": "processing",
                "progress": 99.0,
                "speed": "--",
                "eta": "--"
            })

    ydl_opts: Dict[str, Any] = {
        "outtmpl": outtmpl,
        "progress_hooks": [progress_hook],
        "quiet": True,
        "no_warnings": True,
        "socket_timeout": 30,
    }

    if format_type == "audio":
        bitrate = "320" if quality == "320k" else "192"
        ydl_opts.update({
            "format": "bestaudio/best",
            "postprocessors": [{
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": bitrate,
            }],
        })
    else:
        # Video download
        if quality == "1080p":
            f_str = "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=1080]+bestaudio/best[height<=1080]/best"
        elif quality == "720p":
            f_str = "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=720]+bestaudio/best[height<=720]/best"
        elif quality == "480p":
            f_str = "bestvideo[height<=480][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=480]+bestaudio/best[height<=480]/best"
        elif quality == "360p":
            f_str = "bestvideo[height<=360][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=360]+bestaudio/best[height<=360]/best"
        else:
            # Best quality
            f_str = "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best[ext=mp4]/best"

        ydl_opts.update({
            "format": f_str,
            "merge_output_format": "mp4",
        })

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        # Locate finished file
        files = list(task_dir.iterdir())
        target_files = [f for f in files if not f.name.endswith(".part") and not f.name.endswith(".ytdl")]
        if not target_files:
            raise Exception("下载完成但未找到生成的文件")

        final_file = target_files[0]
        file_size = final_file.stat().st_size
        tasks[task_id].update({
            "status": "completed",
            "progress": 100.0,
            "filename": final_file.name,
            "file_size": file_size,
            "filepath": str(final_file)
        })
        # Register in smart cache
        cache_store[cache_key] = task_id
        # Record audit log
        log_audit_event(url, final_file.name, format_type, quality, file_size, client_ip)

    except Exception as e:
        tasks[task_id].update({
            "status": "error",
            "error": str(e)
        })
        log_audit_event(url, f"下载失败: {str(e)[:100]}", format_type, quality, 0, f"{client_ip} (Error)")

@app.post("/api/download")
async def start_download(req: DownloadRequest, request: Request):
    if not req.url or not req.url.strip():
        raise HTTPException(status_code=400, detail="URL 不能为空")

    cleanup_old_files()

    # Extract client IP (supports Cloudflare Tunnel / proxies)
    client_ip = (
        request.headers.get("cf-connecting-ip")
        or request.headers.get("x-forwarded-for", "").split(",")[0].strip()
        or (request.client.host if request.client else "unknown")
    )

    cache_key = get_cache_key(req.url, req.format_type, req.quality)

    # 1. Smart Cache check: If identical download was completed recently and file exists, return immediately!
    cached_task_id = cache_store.get(cache_key)
    if cached_task_id and cached_task_id in tasks:
        cached_task = tasks[cached_task_id]
        if cached_task.get("status") == "completed" and cached_task.get("filepath"):
            fp = Path(cached_task["filepath"])
            if fp.exists():
                try:
                    fp.parent.touch(exist_ok=True)
                except Exception:
                    pass
                # Record cache hit in audit log
                log_audit_event(req.url.strip(), cached_task.get("filename", "已缓存文件"), req.format_type, req.quality, cached_task.get("file_size", 0), f"{client_ip} (Cache-Hit)")
                return {"task_id": cached_task_id, "cached": True}

    # 2. Create new download task
    task_id = str(uuid.uuid4())
    tasks[task_id] = {
        "task_id": task_id,
        "status": "starting",
        "progress": 0.0,
        "speed": "--",
        "eta": "--",
        "filename": None,
        "file_size": 0,
        "filepath": None,
        "error": None,
        "created_at": time.time()
    }

    # Start download task in background thread
    threading.Thread(
        target=run_download_task,
        args=(task_id, req.url.strip(), req.format_type, req.quality, cache_key, client_ip),
        daemon=True
    ).start()

    return {"task_id": task_id, "cached": False}

@app.get("/api/admin/logs")
async def get_audit_logs(limit: int = 100):
    """Allows admin to view recent download audit logs."""
    if not AUDIT_LOG_FILE.exists():
        return {"logs": [], "total_entries": 0}
    try:
        with open(AUDIT_LOG_FILE, "r", encoding="utf-8", errors="replace") as f:
            lines = f.readlines()
        return {
            "total_entries": len(lines),
            "recent_logs": [line.strip() for line in lines[-limit:]]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/tasks/{task_id}")
async def get_task_status(task_id: str):
    task = tasks.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="任务不存在")
    return {
        "task_id": task["task_id"],
        "status": task["status"],
        "progress": task["progress"],
        "speed": task["speed"],
        "eta": task["eta"],
        "filename": task.get("filename"),
        "file_size": task.get("file_size", 0),
        "error": task.get("error")
    }

@app.get("/api/tasks/{task_id}/file")
async def download_file(task_id: str):
    task = tasks.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="任务未找到")
    if task["status"] != "completed" or not task.get("filepath"):
        raise HTTPException(status_code=400, detail="文件尚未准备就绪或下载失败")

    file_path = Path(task["filepath"])
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="文件已被清理或不存在")

    filename = task.get("filename") or file_path.name
    encoded_filename = quote(filename)

    # Standard headers for resumable downloads (HTTP Range) and UTF-8 filenames
    headers = {
        "Content-Disposition": f"attachment; filename*=UTF-8''{encoded_filename}",
        "Accept-Ranges": "bytes",
        "Cache-Control": f"public, max-age={CACHE_TTL_SECONDS}"
    }

    # Note: We do NOT delete the file on download. The 30-minute safety buffer
    # allows broken downloads to resume and users on poor networks to re-download freely.
    return FileResponse(
        path=file_path,
        media_type="application/octet-stream",
        headers=headers
    )

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting yt-dlp service on http://127.0.0.1:8503 ...")
    uvicorn.run("app:app", host="0.0.0.0", port=8503, reload=True)
