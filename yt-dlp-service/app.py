import os
import shutil
import time
import uuid
import threading
import asyncio
from typing import Optional, Dict, Any
from pathlib import Path
from urllib.parse import quote

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

import yt_dlp

app = FastAPI(
    title="yt-dlp Media Downloader API",
    description="High-performance backend for parsing and downloading video/audio via yt-dlp & ffmpeg",
    version="1.0.0"
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

# In-memory task store
tasks: Dict[str, Dict[str, Any]] = {}

class InfoRequest(BaseModel):
    url: str

class DownloadRequest(BaseModel):
    url: str
    format_type: str = "video"  # "video" or "audio"
    quality: str = "best"       # "best", "1080p", "720p", "480p", "360p", "320k", "192k"

def format_duration(seconds: Optional[int]) -> str:
    if not seconds:
        return "未知"
    m, s = divmod(int(seconds), 60)
    h, m = divmod(m, 60)
    if h > 0:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"

def cleanup_old_files():
    """Removes temporary download folders older than 30 minutes."""
    try:
        now = time.time()
        for item in DOWNLOADS_DIR.iterdir():
            if item.is_dir() and (now - item.stat().st_mtime > 1800):
                shutil.rmtree(item, ignore_errors=True)
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

def run_download_task(task_id: str, url: str, format_type: str, quality: str):
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
        tasks[task_id].update({
            "status": "completed",
            "progress": 100.0,
            "filename": final_file.name,
            "file_size": final_file.stat().st_size,
            "filepath": str(final_file)
        })
    except Exception as e:
        tasks[task_id].update({
            "status": "error",
            "error": str(e)
        })

@app.post("/api/download")
async def start_download(req: DownloadRequest, background_tasks: BackgroundTasks):
    if not req.url or not req.url.strip():
        raise HTTPException(status_code=400, detail="URL 不能为空")

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
        args=(task_id, req.url.strip(), req.format_type, req.quality),
        daemon=True
    ).start()

    return {"task_id": task_id}

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

def remove_task_directory(task_id: str, task_dir: Path):
    time.sleep(15)  # Wait 15s to ensure client completes receiving stream
    try:
        shutil.rmtree(task_dir, ignore_errors=True)
        tasks.pop(task_id, None)
    except Exception as e:
        print(f"[Cleanup Task Error] {e}")

@app.get("/api/tasks/{task_id}/file")
async def download_file(task_id: str, background_tasks: BackgroundTasks):
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

    # Standard RFC 5987 header for UTF-8 Chinese characters support
    headers = {
        "Content-Disposition": f"attachment; filename*=UTF-8''{encoded_filename}"
    }

    # Automatically purge temporary files from the server 15 seconds after download finishes
    background_tasks.add_task(remove_task_directory, task_id, file_path.parent)

    return FileResponse(
        path=file_path,
        media_type="application/octet-stream",
        headers=headers
    )


if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting yt-dlp service on http://127.0.0.1:8503 ...")
    uvicorn.run("app:app", host="0.0.0.0", port=8503, reload=True)
