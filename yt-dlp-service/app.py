import os
import shutil
import time
import uuid
import threading
import asyncio
import zipfile
import re
from typing import Optional, Dict, Any
from pathlib import Path
from urllib.parse import quote

from fastapi import FastAPI, HTTPException, BackgroundTasks, Request, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

import yt_dlp
try:
    from pdf_engine import convert_pdf_to_pptx, get_pdf_info, pymupdf, pptx
except ImportError:
    convert_pdf_to_pptx = None
    get_pdf_info = None
    pymupdf = None
    pptx = None

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
    title: Optional[str] = None
    single_only: bool = False

def sanitize_filename(name: str) -> str:
    cleaned = re.sub(r'[\\/*?:"<>|]', '_', name).strip()
    cleaned = cleaned.strip(". ")
    return cleaned[:150] if cleaned else "media"

def get_cache_key(url: str, format_type: str, quality: str, single_only: bool = False) -> str:
    return f"{format_type.strip().lower()}_{quality.strip().lower()}_{single_only}_{url.strip()}"

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
        "extract_flat": "in_playlist",
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

    is_playlist = info.get("_type") == "playlist" or bool(info.get("entries"))

    if is_playlist:
        entries = list(info.get("entries") or [])
        playlist_count = len(entries)
        title = info.get("title") or "播放列表"
        thumbnail = info.get("thumbnail")
        if not thumbnail and entries:
            first_entry = entries[0]
            if isinstance(first_entry, dict):
                thumbnail = first_entry.get("thumbnail")
                if not thumbnail and first_entry.get("thumbnails"):
                    thumbnail = first_entry["thumbnails"][-1].get("url")

        uploader = info.get("uploader") or info.get("channel") or "未知作者"
        duration_formatted = f"播放列表 · 共 {playlist_count} 个内容" if playlist_count else "播放列表"

        return {
            "id": info.get("id"),
            "title": title,
            "thumbnail": thumbnail,
            "duration": None,
            "duration_formatted": duration_formatted,
            "uploader": uploader,
            "uploader_url": info.get("uploader_url"),
            "view_count": info.get("view_count"),
            "webpage_url": info.get("webpage_url", req.url),
            "available_resolutions": [1080, 720, 480, 360],
            "has_audio": True,
            "is_playlist": True,
            "playlist_count": playlist_count,
        }
    else:
        # Extract available video resolutions for single video
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
            "is_playlist": False,
            "playlist_count": 1,
        }

def run_download_task(
    task_id: str,
    url: str,
    format_type: str,
    quality: str,
    cache_key: str,
    title_hint: Optional[str] = None,
    single_only: bool = False,
    client_ip: str = "unknown"
):
    task_dir = DOWNLOADS_DIR / task_id
    task_dir.mkdir(parents=True, exist_ok=True)

    outtmpl = str(task_dir / "%(playlist_index&{:02d} - |)s%(title).200B.%(ext)s")
    detected_playlist_title = [title_hint]

    def progress_hook(d):
        info = d.get("info_dict", {})
        status = d.get("status")

        pl_title = info.get("playlist_title")
        if pl_title and not detected_playlist_title[0]:
            detected_playlist_title[0] = pl_title

        pl_idx = info.get("playlist_index")
        n_entries = info.get("n_entries") or info.get("playlist_count")
        item_title = info.get("title") or ""

        speed = d.get("speed")
        speed_str = f"{speed / (1024 * 1024):.2f} MB/s" if speed else "--"
        eta = d.get("eta")
        eta_str = f"{eta}s" if eta is not None else "--"
        downloaded = d.get("downloaded_bytes", 0)
        total_bytes = d.get("total_bytes") or d.get("total_bytes_estimate") or 0

        is_pl = bool(n_entries and n_entries > 1)

        if status == "downloading":
            item_percent = (downloaded / total_bytes * 100) if total_bytes > 0 else 0
            if is_pl and pl_idx:
                overall_percent = ((pl_idx - 1) + (item_percent / 100.0)) / n_entries * 100.0
                stage_str = f"正在下载 ({pl_idx}/{n_entries}): {item_title[:35]}"
            else:
                overall_percent = item_percent
                stage_str = f"正在下载: {item_title[:35]}" if item_title else "正在下载流数据..."

            tasks[task_id].update({
                "status": "downloading",
                "progress": round(min(99.0, max(0.0, overall_percent)), 1),
                "speed": speed_str,
                "eta": eta_str,
                "downloaded_bytes": downloaded,
                "total_bytes": total_bytes,
                "stage": stage_str,
                "current_item": pl_idx or 1,
                "total_items": n_entries or 1,
                "is_playlist": is_pl
            })

        elif status == "finished":
            if is_pl and pl_idx:
                overall_percent = (pl_idx / n_entries) * 100.0
                stage_str = f"正在转码/合并 ({pl_idx}/{n_entries}): {item_title[:35]}"
            else:
                overall_percent = 99.0
                stage_str = "正在转码及合并音视频轨 (ffmpeg)..."

            tasks[task_id].update({
                "status": "processing",
                "progress": round(min(99.0, max(0.0, overall_percent)), 1),
                "speed": "--",
                "eta": "--",
                "stage": stage_str,
                "current_item": pl_idx or 1,
                "total_items": n_entries or 1,
                "is_playlist": is_pl
            })

    ydl_opts: Dict[str, Any] = {
        "outtmpl": outtmpl,
        "progress_hooks": [progress_hook],
        "quiet": True,
        "no_warnings": True,
        "socket_timeout": 30,
        "ignoreerrors": "only_download",
        "max_downloads": 100,
    }

    if single_only:
        ydl_opts["noplaylist"] = True

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

        # Locate finished files
        files = list(task_dir.iterdir())
        target_files = [
            f for f in files 
            if f.is_file() 
            and not f.name.endswith(".part") 
            and not f.name.endswith(".ytdl") 
            and not f.name.endswith(".temp")
        ]
        if not target_files:
            raise Exception("下载完成但未找到生成的文件")

        if len(target_files) == 1:
            final_file = target_files[0]
            file_size = final_file.stat().st_size
            tasks[task_id].update({
                "status": "completed",
                "progress": 100.0,
                "filename": final_file.name,
                "file_size": file_size,
                "filepath": str(final_file),
                "stage": "下载完成！",
                "is_playlist": False,
                "file_count": 1
            })
            cache_store[cache_key] = task_id
            log_audit_event(url, final_file.name, format_type, quality, file_size, client_ip)
        else:
            tasks[task_id].update({
                "status": "processing",
                "progress": 99.5,
                "stage": f"正在将 {len(target_files)} 个影音文件打包为 ZIP 压缩包..."
            })

            raw_title = detected_playlist_title[0] or "playlist"
            safe_title = sanitize_filename(raw_title) or f"playlist_{task_id[:8]}"
            zip_filename = f"{safe_title}.zip"
            zip_filepath = task_dir / zip_filename

            if zip_filepath in target_files:
                target_files.remove(zip_filepath)

            sorted_files = sorted(target_files, key=lambda f: f.name)

            with zipfile.ZipFile(zip_filepath, "w", compression=zipfile.ZIP_DEFLATED) as zipf:
                for f in sorted_files:
                    zipf.write(f, arcname=f.name)

            # Remove loose files to save disk space
            for f in sorted_files:
                try:
                    f.unlink()
                except Exception:
                    pass

            final_file = zip_filepath
            file_size = final_file.stat().st_size
            tasks[task_id].update({
                "status": "completed",
                "progress": 100.0,
                "filename": zip_filename,
                "file_size": file_size,
                "filepath": str(final_file),
                "stage": f"播放列表打包完成！共 {len(sorted_files)} 个文件",
                "is_playlist": True,
                "file_count": len(sorted_files)
            })
            cache_store[cache_key] = task_id
            log_audit_event(url, f"[播放列表打包] {zip_filename} ({len(sorted_files)} 个文件)", format_type, quality, file_size, client_ip)

    except Exception as e:
        tasks[task_id].update({
            "status": "error",
            "error": str(e),
            "stage": f"下载失败: {str(e)[:100]}"
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

    cache_key = get_cache_key(req.url, req.format_type, req.quality, req.single_only)

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
        "stage": "正在创建任务...",
        "filename": None,
        "file_size": 0,
        "filepath": None,
        "error": None,
        "is_playlist": False,
        "current_item": 1,
        "total_items": 1,
        "created_at": time.time()
    }

    # Start download task in background thread
    threading.Thread(
        target=run_download_task,
        args=(task_id, req.url.strip(), req.format_type, req.quality, cache_key, req.title, req.single_only, client_ip),
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


# =====================================================================
# PDF to PPTX High-Performance Conversion Endpoints
# =====================================================================

@app.get("/api/pdf/status")
async def get_pdf_status():
    """Returns status of the PDF conversion engine and installed capabilities."""
    return {
        "status": "online",
        "engine": "PyMuPDF + python-pptx",
        "has_pymupdf": pymupdf is not None,
        "has_pptx": pptx is not None,
        "max_size_mb": 1000,
        "features": ["presentation", "hybrid", "extracted", "dpi_custom", "page_range"]
    }


@app.post("/api/pdf/info")
async def extract_pdf_info(file: UploadFile = File(...)):
    """Extracts metadata, dimensions, and page 1 thumbnail without full conversion."""
    if get_pdf_info is None:
        raise HTTPException(status_code=500, detail="PyMuPDF is not installed on this server.")
    try:
        content = await file.read()
        info = get_pdf_info(content)
        info["file_name"] = file.filename or "uploaded.pdf"
        return info
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"PDF 解析失败: {str(e)}")


def run_pdf_conversion_task(task_id: str, pdf_path: Path, pptx_path: Path, mode: str, dpi: int, page_range: str, client_ip: str):
    """Worker thread for PDF to PPTX conversion."""
    try:
        def progress_cb(cur: int, total: int, stage: str, pct: float):
            if task_id in tasks:
                tasks[task_id]["current_page"] = cur
                tasks[task_id]["total_pages"] = total
                tasks[task_id]["stage"] = stage
                tasks[task_id]["progress"] = round(pct, 1)

        res = convert_pdf_to_pptx(
            pdf_source=pdf_path,
            output_dest=pptx_path,
            mode=mode,
            dpi=dpi,
            page_range=page_range,
            progress_callback=progress_cb
        )

        try:
            if pdf_path.exists():
                pdf_path.unlink()
        except Exception:
            pass

        if task_id in tasks:
            tasks[task_id]["status"] = "completed"
            tasks[task_id]["progress"] = 100.0
            tasks[task_id]["stage"] = "转换完成！"
            tasks[task_id]["filepath"] = str(pptx_path)
            tasks[task_id]["file_size"] = res["output_size_bytes"]
            tasks[task_id]["duration"] = res["duration_seconds"]
            tasks[task_id]["pages_converted"] = res["pages_converted"]

        log_audit_event(
            url="PDF-Upload",
            title=f"PDF2PPTX: {pptx_path.name} ({res['pages_converted']}p)",
            format_type="pptx",
            quality=f"{mode}_{dpi}dpi",
            file_size=res["output_size_bytes"],
            client_ip=client_ip
        )

    except Exception as e:
        print(f"[PDF Conversion Error] Task {task_id}: {e}")
        if task_id in tasks:
            tasks[task_id]["status"] = "error"
            tasks[task_id]["error"] = str(e)
            tasks[task_id]["stage"] = f"转换出错: {e}"


@app.post("/api/pdf/convert")
async def start_pdf_conversion(
    request: Request,
    file: UploadFile = File(...),
    mode: str = Form("presentation"),
    dpi: int = Form(180),
    page_range: str = Form("all")
):
    """
    Accepts PDF upload (no size limit) and converts into PPTX.
    """
    if convert_pdf_to_pptx is None:
        raise HTTPException(status_code=500, detail="PyMuPDF 或 python-pptx 未安装，请在服务端执行 pip install -r requirements.txt")

    cleanup_old_files()

    client_ip = request.client.host if request.client else "unknown"
    task_id = str(uuid.uuid4())
    raw_name = file.filename or "presentation.pdf"
    stem = Path(raw_name).stem or "presentation"
    safe_stem = "".join([c for c in stem if c.isalnum() or c in (" ", "-", "_", "(", ")")]).strip() or "presentation"
    out_filename = f"{safe_stem}.pptx"

    temp_pdf_path = DOWNLOADS_DIR / f"upload_{task_id}.pdf"
    pptx_path = DOWNLOADS_DIR / f"{safe_stem}_{task_id[:8]}.pptx"

    try:
        with open(temp_pdf_path, "wb") as f:
            while chunk := await file.read(1024 * 1024):
                f.write(chunk)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"保存上传文件失败: {str(e)}")

    tasks[task_id] = {
        "task_id": task_id,
        "status": "processing",
        "progress": 5.0,
        "current_page": 0,
        "total_pages": 0,
        "stage": "正在解析 PDF 结构...",
        "filename": out_filename,
        "filepath": None,
        "file_size": 0,
        "error": None,
        "created_at": time.time(),
        "speed": "--",
        "eta": "--"
    }

    threading.Thread(
        target=run_pdf_conversion_task,
        args=(task_id, temp_pdf_path, pptx_path, mode, dpi, page_range, client_ip),
        daemon=True
    ).start()

    return {"task_id": task_id, "filename": out_filename}


@app.get("/api/pdf/tasks/{task_id}")
async def get_pdf_task_status(task_id: str):
    """Alias for task status."""
    return await get_task_status(task_id)


@app.get("/api/pdf/tasks/{task_id}/file")
async def get_pdf_task_file(task_id: str):
    """Alias for task file download."""
    return await download_file(task_id)


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
        "stage": task.get("stage"),
        "current_item": task.get("current_item", 1),
        "total_items": task.get("total_items", 1),
        "is_playlist": task.get("is_playlist", False),
        "file_count": task.get("file_count", 1),
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
