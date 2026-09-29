#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Standalone PDF to PPTX Microservice
Designed for high-capacity batch conversion without file size limits.
"""

import os
import sys
import time
import uuid
import shutil
import threading
from pathlib import Path
from urllib.parse import quote
from typing import Dict, Any

from fastapi import FastAPI, HTTPException, Request, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse

from pdf_engine import convert_pdf_to_pptx, get_pdf_info, pymupdf, pptx

app = FastAPI(
    title="PDF to PPTX High-Performance API",
    description="Dedicated server backend for converting large PDF files into Microsoft PowerPoint (.pptx) presentations without file size limits.",
    version="1.0.0"
)

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

tasks: Dict[str, Dict[str, Any]] = {}
CACHE_TTL_SECONDS = 1800  # 30 minutes retention


def cleanup_old_files():
    now = time.time()
    for task_id in list(tasks.keys()):
        t = tasks[task_id]
        if now - t.get("created_at", 0) > CACHE_TTL_SECONDS:
            if t.get("filepath"):
                try:
                    f = Path(t["filepath"])
                    if f.exists():
                        f.unlink()
                except Exception:
                    pass
            tasks.pop(task_id, None)


@app.get("/")
@app.get("/api/status")
@app.get("/api/pdf/status")
async def get_status():
    return {
        "status": "online",
        "service": "PDF to PPTX Converter",
        "engine": "PyMuPDF + python-pptx",
        "has_pymupdf": pymupdf is not None,
        "has_pptx": pptx is not None,
        "max_size_mb": 1000,
        "features": ["presentation", "hybrid", "extracted", "dpi_custom", "page_range"]
    }


@app.post("/api/pdf/info")
async def extract_pdf_info(file: UploadFile = File(...)):
    try:
        content = await file.read()
        info = get_pdf_info(content)
        info["file_name"] = file.filename or "uploaded.pdf"
        return info
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"PDF 解析失败: {str(e)}")


def run_worker(task_id: str, pdf_path: Path, pptx_path: Path, mode: str, dpi: int, page_range: str):
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

    except Exception as e:
        if task_id in tasks:
            tasks[task_id]["status"] = "error"
            tasks[task_id]["error"] = str(e)
            tasks[task_id]["stage"] = f"转换出错: {e}"


@app.post("/api/pdf/convert")
async def convert_pdf(
    file: UploadFile = File(...),
    mode: str = Form("presentation"),
    dpi: int = Form(180),
    page_range: str = Form("all")
):
    cleanup_old_files()

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
        target=run_worker,
        args=(task_id, temp_pdf_path, pptx_path, mode, dpi, page_range),
        daemon=True
    ).start()

    return {"task_id": task_id, "filename": out_filename}


@app.get("/api/pdf/tasks/{task_id}")
@app.get("/api/tasks/{task_id}")
async def get_task_status(task_id: str):
    task = tasks.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="任务不存在")
    return task


@app.get("/api/pdf/tasks/{task_id}/file")
@app.get("/api/tasks/{task_id}/file")
async def download_task_file(task_id: str):
    task = tasks.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="任务未找到")
    if task["status"] != "completed" or not task.get("filepath"):
        raise HTTPException(status_code=400, detail="文件尚未准备好或转换失败")

    fp = Path(task["filepath"])
    if not fp.exists():
        raise HTTPException(status_code=404, detail="文件已被清理或不存在")

    filename = task.get("filename") or fp.name
    encoded_filename = quote(filename)

    headers = {
        "Content-Disposition": f"attachment; filename*=UTF-8''{encoded_filename}",
        "Accept-Ranges": "bytes",
        "Cache-Control": f"public, max-age={CACHE_TTL_SECONDS}"
    }

    return FileResponse(path=fp, media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation", headers=headers)


if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting PDF to PPTX Service on http://127.0.0.1:8505 ...")
    uvicorn.run("app:app", host="0.0.0.0", port=8505, reload=True)
