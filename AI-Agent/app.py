import json
import os
import base64
import time
import shutil
import uuid
import glob
import asyncio
from pathlib import Path
from typing import List, Dict, Any, Optional

import cv2
import docx
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from faster_whisper import WhisperModel
from openai import OpenAI
import subprocess

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from pydantic import BaseModel

# ================= 基础目录与配置 =================
BASE_DIR = Path(__file__).resolve().parent
UPLOADS_DIR = BASE_DIR / "uploads"
OUTPUTS_DIR = BASE_DIR / "outputs"
LOGS_DIR = BASE_DIR / "logs"

UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)
LOGS_DIR.mkdir(parents=True, exist_ok=True)
AUDIT_LOG_FILE = LOGS_DIR / "agent_access.log"

DEFAULT_API_KEY = os.environ.get("NVIDIA_API_KEY", "")
DEFAULT_BASE_URL = "https://integrate.api.nvidia.com/v1"
DEFAULT_MODEL = "meta/muse-glimmer-30b"
SERVER_COMPRESS_KEY = os.environ.get("AGENT_SECRET_KEY", "123456")

app = FastAPI(
    title="教师专属 Office & 多模态 AI Agent API",
    description="高并发后端 API 服务：支持超长会议音视频切片转录、录屏 PPT 视觉提取与标准 Minit Curai 官函公文一键生成",
    version="2.0.0"
)

# 允许跨域（支持 Cloudflare Pages、Localhost 等各前端直连）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def log_audit_event(action: str, client_ip: str, detail: str = ""):
    try:
        now_str = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        log_entry = f"[{now_str}] IP: {client_ip} | 操作: {action} | 详情: {detail}\n"
        with open(AUDIT_LOG_FILE, "a", encoding="utf-8") as f:
            f.write(log_entry)
    except Exception as e:
        print(f"[Audit Log Error] {e}")

def cleanup_old_files(max_age_seconds: int = 7200):
    """自动清理两小时前的临时上传与生成文件，防止磁盘溢出"""
    try:
        now = time.time()
        for folder in [UPLOADS_DIR, OUTPUTS_DIR]:
            for item in folder.iterdir():
                if item.is_file() and (now - item.stat().st_mtime > max_age_seconds):
                    try:
                        item.unlink()
                    except Exception:
                        pass
    except Exception as e:
        print(f"[Cleanup Error] {e}")

# ================= 核心多模态与工具函数 =================

def extract_slides_text(video_path: str, client: OpenAI, emit_callback=None, sample_interval_sec=10, diff_threshold=35.0, max_slides=6) -> str:
    if not os.path.exists(video_path):
        return f"错误：找不到视频文件 {video_path}"
    
    if emit_callback:
        emit_callback("🖼️ 正在抽帧分析录屏 PPT 画面关键节点...")
    
    try:
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        if fps == 0:
            return "无法读取视频帧率。"
        
        frame_interval = int(fps * sample_interval_sec)
        prev_gray = None
        slide_summaries = []
        slide_count = 0
        frame_idx = 0
        
        while cap.isOpened() and slide_count < max_slides:
            ret, frame = cap.read()
            if not ret:
                break
            
            if frame_idx % frame_interval == 0:
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                is_new_slide = False
                
                if prev_gray is None:
                    is_new_slide = True
                    prev_gray = gray
                else:
                    diff = cv2.absdiff(prev_gray, gray)
                    if diff.mean() > diff_threshold:
                        is_new_slide = True
                        prev_gray = gray
                
                if is_new_slide:
                    slide_count += 1
                    if emit_callback:
                        emit_callback(f"🔍 捕捉到第 {slide_count} 页 PPT 幻灯片，正在使用轻量视觉模型提取图文...")
                    
                    resized_frame = cv2.resize(frame, (512, int(512 * frame.shape[0] / frame.shape[1])))
                    _, buffer = cv2.imencode('.jpg', resized_frame)
                    base64_image = base64.b64encode(buffer).decode('utf-8')
                    
                    try:
                        vision_resp = client.chat.completions.create(
                            model="meta/llama-3.2-11b-vision-instruct",
                            max_tokens=1024,
                            messages=[{
                                "role": "user",
                                "content": [
                                    {"type": "text", "text": "请简要提取这张会议 PPT 幻灯片中的核心文字标题、数据与关键要点："},
                                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
                                ]
                            }]
                        )
                        slide_text = vision_resp.choices[0].message.content
                        slide_summaries.append(f"--- [幻灯片第 {slide_count} 页要点] ---\n{slide_text}")
                    except Exception as ve:
                        print(f"视觉提取跳过: {ve}")
                        
            frame_idx += 1
        
        cap.release()
        total_extracted = "\n\n".join(slide_summaries)
        return total_extracted if total_extracted else "录屏中未检测到明显的 PPT 幻灯片切换。"
    except Exception as e:
        return f"未能提取 PPT 画面: {str(e)}"

# 单例全局 Whisper 模型缓存，避免每次请求重复载入权重
whisper_model_instance = None

def get_whisper_model():
    global whisper_model_instance
    if whisper_model_instance is None:
        whisper_model_instance = WhisperModel("base", device="cpu", compute_type="int8")
    return whisper_model_instance

def transcribe_audio(file_path: str, emit_callback=None) -> tuple[str, Optional[str]]:
    """转录音频，返回 (转录文本, 逐字稿生成文件名)"""
    if not os.path.exists(file_path):
        return f"错误：找不到文件 {file_path}", None
    
    if emit_callback:
        emit_callback("🎙️ 正在启动 Faster-Whisper 音频转录引擎...")
        
    try:
        model = get_whisper_model()
        file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
        full_transcript = ""
        
        if file_size_mb > 25:
            if emit_callback:
                emit_callback(f"✂️ 检测到大文件 ({file_size_mb:.1f}MB)，正在后台极速无损分段切片...")
                
            temp_dir = BASE_DIR / "uploads" / "chunks"
            temp_dir.mkdir(parents=True, exist_ok=True)
            base_name = Path(file_path).stem
            ext = Path(file_path).suffix or ".mp4"
            chunk_pattern = str(temp_dir / f"chunk_{base_name}_%03d{ext}")
            
            subprocess.run([
                "ffmpeg", "-y", "-i", file_path,
                "-f", "segment", "-segment_time", "600",
                "-c", "copy", chunk_pattern
            ], capture_output=True)
            
            chunk_files = sorted(glob.glob(str(temp_dir / f"chunk_{base_name}_*{ext}")))
            
            if not chunk_files:
                if emit_callback:
                    emit_callback("⚠️ 未检测到分片，回退到全局整体转录...")
                segments, _ = model.transcribe(file_path, beam_size=5)
                for s in segments:
                    full_transcript += s.text
            else:
                total_chunks = len(chunk_files)
                for i, chunk_file in enumerate(chunk_files):
                    if emit_callback:
                        emit_callback(f"⚙️ 正在转录第 {i+1}/{total_chunks} 个语音片段...")
                    segments, _ = model.transcribe(chunk_file, beam_size=5)
                    for s in segments:
                        full_transcript += s.text
                    try:
                        os.remove(chunk_file)
                    except Exception:
                        pass
        else:
            if emit_callback:
                emit_callback("⚙️ 音频长度适中，正在全速转录中...")
            segments, _ = model.transcribe(file_path, beam_size=5)
            full_transcript = "".join([s.text for s in segments])
            
        full_transcript = full_transcript.strip()
        
        # 写入 outputs 目录供下载
        transcript_filename = f"会议逐字稿_{uuid.uuid4().hex[:6]}.txt"
        transcript_path = OUTPUTS_DIR / transcript_filename
        with open(transcript_path, "w", encoding="utf-8") as f:
            f.write(full_transcript)
            
        return f"语音转录成功！以下为转录文本内容：\n{full_transcript}", transcript_filename
    except Exception as e:
        return f"语音转录失败，原因: {str(e)}", None

def extract_pdf_text(file_path: str, emit_callback=None) -> str:
    if not os.path.exists(file_path):
        return f"错误：找不到文件 {file_path}"
    if emit_callback:
        emit_callback("📄 正在解析 PDF 文档排版与文本...")
    try:
        import PyPDF2
        text = ""
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        if not text.strip():
            return "PDF 提取完成，但未发现纯文本内容（可能是纯图片扫描版）。"
        return f"PDF 文本提取成功！内容如下：\n{text}"
    except Exception as e:
        return f"PDF 提取失败: {str(e)}"

def extract_ppt_text(file_path: str, emit_callback=None) -> str:
    if not os.path.exists(file_path):
        return f"错误：找不到文件 {file_path}"
    if emit_callback:
        emit_callback("📊 正在提取 PPTX 演示幻灯片内容...")
    try:
        from pptx import Presentation
        prs = Presentation(file_path)
        text = ""
        for i, slide in enumerate(prs.slides):
            text += f"--- 第 {i+1} 页 ---\n"
            for shape in slide.shapes:
                if hasattr(shape, "text"):
                    text += shape.text + "\n"
        return f"PPT 文本提取成功！内容如下：\n{text}"
    except Exception as e:
        return f"PPT 提取失败: {str(e)}"

def generate_minit_curai(
    file_path: str, tajuk_program: str, tarikh: str, masa: str, tempat: str, penganjur: str, penceramah: str,
    nama_sekolah: str = "NAMA SEKOLAH", alamat_sekolah: str = "ALAMAT SEKOLAH",
    nama_penyedia: str = "NAMA GURU", jawatan_penyedia: str = "Guru Penolong",
    nama_pengesah: str = "NAMA GURU BESAR", jawatan_pengesah: str = "Guru Besar",
    salinan_kepada: str = "SEMUA GURU", pengisian_items: list = []
) -> str:
    doc = docx.Document()
    
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        
    header_p = doc.add_paragraph()
    header_run = header_p.add_run(f"{str(nama_sekolah).upper()},\n{str(alamat_sekolah).upper()}\n")
    header_run.bold = True
    header_run.font.size = Pt(11)
    
    title_p = doc.add_paragraph()
    title_run = title_p.add_run("KERTAS MINIT CURAI")
    title_run.bold = True
    title_run.font.size = Pt(13)
    title_run.font.underline = True
    title_p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    
    meta_info = [
        ("Kepada", "GURU BESAR"),
        ("Daripada", str(nama_penyedia).upper()),
        ("Salinan kepada", salinan_kepada),
        ("Tajuk Program", str(tajuk_program).upper()),
        ("Tarikh", str(tarikh).upper()),
        ("Masa", str(masa)),
        ("Tempat", str(tempat).upper()),
        ("Penganjur", str(penganjur).upper()),
        ("Penceramah", str(penceramah).upper()),
    ]
    
    for label, val in meta_info:
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.line_spacing = 1.15
        run_label = p.add_run(f"{label:<16}: ")
        run_label.bold = True
        run_val = p.add_run(val)
        
    content_head = doc.add_paragraph()
    content_head.paragraph_format.space_before = Pt(8)
    head_run = content_head.add_run("Ringkasan Kandungan Pengisian:")
    head_run.bold = True
    head_run.font.underline = True
    
    p_main = doc.add_paragraph()
    p_main_run = p_main.add_run(f"1. Bengkel / Taklimat daripada {str(penceramah).upper()}:")
    p_main_run.bold = True
    
    for item in pengisian_items:
        sub_title = item.get("sub_title", "")
        details = item.get("details", [])
        
        if sub_title:
            sub_p = doc.add_paragraph()
            sub_p.paragraph_format.left_indent = Inches(0.3)
            sub_p.paragraph_format.space_after = Pt(2)
            sub_run = sub_p.add_run(sub_title)
            sub_run.bold = True
            
        for detail in details:
            d_p = doc.add_paragraph(style='List Bullet')
            d_p.paragraph_format.left_indent = Inches(0.5)
            d_p.paragraph_format.space_after = Pt(2)
            d_p.add_run(detail)
            
    doc.add_paragraph().paragraph_format.space_before = Pt(12)
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    cell_left = table.cell(0, 0)
    cell_left.width = Inches(3.2)
    p_left = cell_left.paragraphs[0]
    p_left.paragraph_format.line_spacing = 1.15
    p_left.add_run("Disediakan oleh,\n\n..................................................\n")
    p_left.add_run(f"({str(nama_penyedia).upper()})\n").bold = True
    p_left.add_run(f"{jawatan_penyedia}\n{nama_sekolah}\n")
    p_left.add_run(f"Tarikh : {tarikh}")
    
    cell_right = table.cell(0, 1)
    cell_right.width = Inches(3.2)
    p_right = cell_right.paragraphs[0]
    p_right.paragraph_format.line_spacing = 1.15
    p_right.add_run("Disahkan oleh,\n\n..................................................\n")
    if nama_pengesah:
        p_right.add_run(f"({str(nama_pengesah).upper()})\n").bold = True
    else:
        p_right.add_run("(                                             )\n").bold = True
    p_right.add_run(f"{jawatan_pengesah}\n{nama_sekolah}\n")
    p_right.add_run("Tarikh : ")
    
    doc.save(file_path)
    return "成功生成标准公文 Word 文件！"

# ================= Agent 工具 Schema =================
tools = [
    {
        "type": "function",
        "function": {
            "name": "transcribe_audio",
            "description": "读取音频(.mp3, .m4a)或录屏(.mp4)的语音内容并转录为文本逐字稿",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "音视频文件路径"}
                },
                "required": ["file_path"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "extract_slides_text",
            "description": "自动截取录屏(.mp4)中播放的 PPT 幻灯片并使用视觉模型读取画面文字，用于补充关键数据",
            "parameters": {
                "type": "object",
                "properties": {
                    "video_path": {"type": "string", "description": "录屏文件路径"}
                },
                "required": ["video_path"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "extract_pdf_text",
            "description": "读取 PDF 文档内容，提取纯文本",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "PDF 文件路径"}
                },
                "required": ["file_path"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "extract_ppt_text",
            "description": "读取 PPTX 演示文稿内容，提取各页的纯文本",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "PPTX 文件路径"}
                },
                "required": ["file_path"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "generate_minit_curai",
            "description": "严格按照马来西亚教育机构标准格式生成规范的 Minit Curai Word 文档",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "输出的 docx 文件名，例如 'Minit_Curai.docx'"},
                    "tajuk_program": {"type": "string", "description": "会议/简报完整名称"},
                    "tarikh": {"type": "string", "description": "会议日期，例如 '7 JULAI 2026'"},
                    "masa": {"type": "string", "description": "会议时间，例如 '4:00 p.m.'"},
                    "tempat": {"type": "string", "description": "地点或平台，例如 'SECARA ATAS TALIAN (WEBEX)'"},
                    "penganjur": {"type": "string", "description": "主办单位"},
                    "penceramah": {"type": "string", "description": "主讲人姓名"},
                    "nama_sekolah": {"type": "string", "description": "学校名称"},
                    "alamat_sekolah": {"type": "string", "description": "学校地址"},
                    "nama_penyedia": {"type": "string", "description": "准备人姓名 (Disediakan oleh)"},
                    "jawatan_penyedia": {"type": "string", "description": "准备人职衔，默认 'Guru Penolong'"},
                    "nama_pengesah": {"type": "string", "description": "审核人姓名 (Disahkan oleh)"},
                    "jawatan_pengesah": {"type": "string", "description": "审核人职衔，默认 'Guru Besar'"},
                    "salinan_kepada": {"type": "string", "description": "抄送对象，默认为 'SEMUA GURU'"},
                    "pengisian_items": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "sub_title": {"type": "string", "description": "子项目标题，如 'i. Pengenalan Program'"},
                                "details": {"type": "array", "items": {"type": "string"}, "description": "具体要点与决策列表"}
                            },
                            "required": ["sub_title", "details"]
                        },
                        "description": "按 i, ii, iii 组织的会议内容与决议结构"
                    }
                },
                "required": ["file_path", "tajuk_program", "tarikh", "masa", "tempat", "penganjur", "penceramah", "pengisian_items", "nama_sekolah", "nama_penyedia", "nama_pengesah"]
            }
        }
    }
]

SYSTEM_PROMPT = """
你是马来西亚全国教师专属的教学与公文助理。

【最高优先级铁律】：
1. 一旦你收集完信息并准备好生成 Minit Curai 时，你 **绝对不能** 在聊天回复中以纯文本或 Markdown 格式输出公文内容！你 **必须且只能** 立即调用 `generate_minit_curai` 工具来生成文件。
2. 如果用户没有提供个人信息（如学校名称、姓名、校长姓名等），**不要等待或只给纯文本草稿**，必须立刻调用 `generate_minit_curai` 工具，使用占位符（如 NAMA SEKOLAH, NAMA GURU）生成文件，然后再在回复中请用户提供信息以更新文件。
3. 当用户提供补充信息或要求修改时，你必须再次调用 `generate_minit_curai` 工具来覆盖旧文件。
4. 当用户上传文件时，请根据文件类型优先调用 `transcribe_audio`、`extract_slides_text`、`extract_pdf_text` 或 `extract_ppt_text` 获取详实内容。
5. 你完全支持中文（华文），当用户询问或要求使用华文生成会议记录（Minit Curai）时，请使用华文来生成内容，并且与用户使用华文进行对话。
"""

# ================= API 路由 =================

@app.get("/api/status")
async def get_status():
    """获取服务健康状态与运行环境"""
    cleanup_old_files()
    ffmpeg_available = shutil.which("ffmpeg") is not None
    return {
        "status": "online",
        "service": "AI-Agent Multi-Modal Backend",
        "version": "2.0.0",
        "ffmpeg_available": ffmpeg_available,
        "has_server_api_key": bool(DEFAULT_API_KEY),
        "default_model": DEFAULT_MODEL,
        "timestamp": time.time()
    }

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...), request: Request = None):
    """文件上传接口，保存到本地临时存储并返回文件信息"""
    cleanup_old_files()
    client_ip = request.client.host if request and request.client else "unknown"
    
    ext = Path(file.filename).suffix
    safe_name = f"{uuid.uuid4().hex[:8]}_{file.filename}"
    saved_path = UPLOADS_DIR / safe_name
    
    with open(saved_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
        
    file_size = os.path.getsize(saved_path)
    log_audit_event("UPLOAD_FILE", client_ip, f"文件名: {file.filename} | 大小: {file_size / (1024*1024):.2f}MB")
    
    return {
        "status": "success",
        "filename": file.filename,
        "saved_path": str(saved_path),
        "file_size": file_size
    }

def get_video_duration(video_path: str) -> float:
    try:
        cmd = [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            video_path
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        return float(res.stdout.strip())
    except Exception:
        try:
            cap = cv2.VideoCapture(video_path)
            fps = cap.get(cv2.CAP_PROP_FPS)
            frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
            cap.release()
            if fps > 0 and frame_count > 0:
                return float(frame_count / fps)
        except Exception:
            pass
    return 600.0

@app.post("/api/compress")
async def compress_video(
    file: UploadFile = File(...),
    target_size_mb: float = Form(25.0),
    mode: str = Form("target_size"),
    secret_key: Optional[str] = Form(""),
    request: Request = None
):
    """
    仅受权用户专享的服务器级原生极速转码服务（普通用户默认在浏览器端本地 WASM 运行，避免占满服务器 CPU）
    """
    client_ip = request.client.host if request and request.client else "unknown"
    
    if not secret_key or secret_key.strip() != SERVER_COMPRESS_KEY:
        log_audit_event("COMPRESS_DENIED", client_ip, f"鉴权未通过: {secret_key}")
        raise HTTPException(
            status_code=403,
            detail="⚠️ 权限不足：为保证核心 Agent 稳定运行，服务器原生转码引擎仅对持有授权口令的内部人员开放。普通用户请使用页面内置的【本地浏览器模式】！"
        )
        
    cleanup_old_files()
    temp_input = UPLOADS_DIR / f"raw_{uuid.uuid4().hex[:8]}_{file.filename}"
    with open(temp_input, "wb") as f:
        shutil.copyfileobj(file.file, f)
        
    original_size = os.path.getsize(temp_input)
    
    try:
        if mode == "audio_only":
            out_filename = f"audio_{uuid.uuid4().hex[:6]}_{Path(file.filename).stem}.mp3"
            out_path = OUTPUTS_DIR / out_filename
            cmd = [
                "ffmpeg", "-y", "-i", str(temp_input),
                "-vn", "-c:a", "libmp3lame", "-q:a", "4",
                str(out_path)
            ]
            subprocess.run(cmd, capture_output=True, check=True)
        else:
            out_filename = f"comp_{uuid.uuid4().hex[:6]}_{Path(file.filename).stem}.mp4"
            out_path = OUTPUTS_DIR / out_filename
            
            duration = get_video_duration(str(temp_input))
            if duration <= 0:
                duration = 600.0
                
            target_bits = target_size_mb * 8 * 1024 * 1024
            audio_bitrate_kbps = 64
            target_video_kbps = max(80, int((target_bits / duration) / 1000 - audio_bitrate_kbps))
            
            cmd = [
                "ffmpeg", "-y", "-i", str(temp_input),
                "-b:v", f"{target_video_kbps}k",
                "-maxrate", f"{int(target_video_kbps * 1.4)}k",
                "-bufsize", f"{int(target_video_kbps * 2)}k",
                "-vf", "scale=-2:720",
                "-c:v", "libx264",
                "-preset", "faster",
                "-c:a", "aac", "-b:a", "64k",
                str(out_path)
            ]
            subprocess.run(cmd, capture_output=True, check=True)
            
        compressed_size = os.path.getsize(out_path)
        saved_percent = max(0.0, (original_size - compressed_size) / original_size * 100)
        
        try:
            temp_input.unlink()
        except Exception:
            pass
            
        log_audit_event("COMPRESS_SUCCESS", client_ip, f"模式: {mode} | 原始: {original_size/(1024*1024):.1f}MB | 压缩后: {compressed_size/(1024*1024):.1f}MB")
        
        return {
            "status": "success",
            "filename": out_filename,
            "download_url": f"/api/download/{out_filename}",
            "saved_path": str(out_path),
            "original_size": original_size,
            "compressed_size": compressed_size,
            "saved_percent": round(saved_percent, 1)
        }
    except Exception as e:
        try:
            if temp_input.exists():
                temp_input.unlink()
        except Exception:
            pass
        raise HTTPException(status_code=500, detail=f"压缩转码失败: {str(e)}")

class ChatRequest(BaseModel):
    messages: List[Dict[str, Any]]
    current_files: Optional[List[str]] = []
    api_key: Optional[str] = ""
    base_url: Optional[str] = ""
    model: Optional[str] = ""

@app.post("/api/chat")
async def chat_stream(req: ChatRequest, request: Request):
    """
    智能 Agent 对话流（通过 SSE Server-Sent Events 实现多轮思考、工具执行与打字机响应）
    """
    client_ip = request.client.host if request.client else "unknown"
    log_audit_event("CHAT_REQUEST", client_ip, f"消息轮数: {len(req.messages)}")
    
    actual_api_key = req.api_key.strip() if req.api_key else DEFAULT_API_KEY
    actual_base_url = req.base_url.strip() if req.base_url else DEFAULT_BASE_URL
    actual_model = req.model.strip() if req.model else DEFAULT_MODEL
    
    if not actual_api_key:
        async def err_stream():
            err_msg = "❌ 服务端及客户端均未配置 Nvidia NIM API Key。请在前端右上角【设置】中填入你的 API Key！"
            yield f"data: {json.dumps({'type': 'error', 'message': err_msg}, ensure_ascii=False)}\n\n"
        return StreamingResponse(err_stream(), media_type="text/event-stream")
    
    client = OpenAI(
        base_url=actual_base_url,
        api_key=actual_api_key,
        timeout=120.0
    )
    
    async def event_generator():
        # 构建初始消息列表
        convo_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        
        # 复制用户传入的会话历史
        for msg in req.messages:
            convo_messages.append({"role": msg.get("role"), "content": msg.get("content")})
            
        # 如果当前有挂载的文件，静默给最后一条用户指令注入文件上下文
        if req.current_files and convo_messages[-1]["role"] == "user":
            files_prompt = "\n".join(req.current_files)
            convo_messages[-1]["content"] += f"\n[系统提示：用户已上传待处理文件，路径如下:\n{files_prompt}]"
            
        # 工具执行状态回调队列
        loop = asyncio.get_running_loop()
        status_queue = asyncio.Queue()
        
        def emit_status(status_text: str):
            loop.call_soon_threadsafe(status_queue.put_nowait, status_text)
            
        # 多轮工具调用循环（最多允许 5 轮思考与工具链触发）
        try:
            for round_idx in range(5):
                yield f"data: {json.dumps({'type': 'thought', 'message': f'AI Agent 正在分析与组织下一步执行策略 (第 {round_idx+1} 轮)...'}, ensure_ascii=False)}\n\n"
                
                # 调用 LLM 判断是否触发工具
                response = await asyncio.to_thread(
                    client.chat.completions.create,
                    model=actual_model,
                    messages=convo_messages,
                    tools=tools
                )
                
                resp_message = response.choices[0].message
                convo_messages.append(resp_message.model_dump(exclude_none=True))
                
                # 如果无需调用工具，输出内容并结束
                if not resp_message.tool_calls:
                    final_text = resp_message.content or ""
                    yield f"data: {json.dumps({'type': 'content', 'delta': final_text}, ensure_ascii=False)}\n\n"
                    break
                    
                # 遍历处理本轮请求的所有工具
                for tool_call in resp_message.tool_calls:
                    func_name = tool_call.function.name
                    args = json.loads(tool_call.function.arguments)
                    
                    yield f"data: {json.dumps({'type': 'tool_start', 'name': func_name, 'args': args}, ensure_ascii=False)}\n\n"
                    
                    tool_result = ""
                    generated_file_info = None
                    
                    # 启动后台线程执行可能耗时的本地多模态工具，同时排空并发送 status_queue 状态
                    async def run_tool():
                        nonlocal tool_result, generated_file_info
                        if func_name == "transcribe_audio":
                            res_text, transcript_file = transcribe_audio(args.get("file_path"), emit_callback=emit_status)
                            tool_result = res_text
                            if transcript_file:
                                generated_file_info = {
                                    "filename": transcript_file,
                                    "title": "会议完整逐字稿 (.txt)",
                                    "url": f"/api/download/{transcript_file}"
                                }
                        elif func_name == "extract_slides_text":
                            tool_result = extract_slides_text(args.get("video_path"), client=client, emit_callback=emit_status)
                        elif func_name == "extract_pdf_text":
                            tool_result = extract_pdf_text(args.get("file_path"), emit_callback=emit_status)
                        elif func_name == "extract_ppt_text":
                            tool_result = extract_ppt_text(args.get("file_path"), emit_callback=emit_status)
                        elif func_name == "generate_minit_curai":
                            raw_filename = os.path.basename(args.get("file_path", "Minit_Curai.docx"))
                            if not raw_filename.endswith(".docx"):
                                raw_filename += ".docx"
                            unique_filename = f"Minit_Curai_{uuid.uuid4().hex[:6]}.docx"
                            save_path = str(OUTPUTS_DIR / unique_filename)
                            
                            emit_status("📄 正在按照规范排版生成 Minit Curai 官函文档...")
                            tool_result = generate_minit_curai(
                                file_path=save_path,
                                tajuk_program=args.get("tajuk_program", "TAJUK"),
                                tarikh=args.get("tarikh", "TARIKH"),
                                masa=args.get("masa", "MASA"),
                                tempat=args.get("tempat", "TEMPAT"),
                                penganjur=args.get("penganjur", args.get("penceramah", "PENGANJUR")),
                                penceramah=args.get("penceramah", "PENCERAMAH"),
                                nama_sekolah=args.get("nama_sekolah", "NAMA SEKOLAH"),
                                alamat_sekolah=args.get("alamat_sekolah", "ALAMAT SEKOLAH"),
                                nama_penyedia=args.get("nama_penyedia", "NAMA GURU"),
                                jawatan_penyedia=args.get("jawatan_penyedia", "Guru Penolong"),
                                nama_pengesah=args.get("nama_pengesah", "NAMA GURU BESAR"),
                                jawatan_pengesah=args.get("jawatan_pengesah", "Guru Besar"),
                                salinan_kepada=args.get("salinan_kepada", "SEMUA GURU"),
                                pengisian_items=args.get("pengisian_items", [])
                            )
                            generated_file_info = {
                                "filename": unique_filename,
                                "title": "标准 Minit Curai 公文 (.docx)",
                                "url": f"/api/download/{unique_filename}"
                            }
                        else:
                            tool_result = f"未知的工具名称: {func_name}"
                            
                    task = asyncio.create_task(asyncio.to_thread(lambda: asyncio.run(run_tool()) if False else None)) # placeholder
                    tool_future = asyncio.to_thread(
                        lambda: asyncio.run(run_tool()) if False else None # we invoke run_tool synchronously in thread
                    )
                    
                    # 真正执行并在前台流式输出中间进度
                    tool_task = asyncio.create_task(run_tool())
                    while not tool_task.done():
                        try:
                            msg = await asyncio.wait_for(status_queue.get(), timeout=0.2)
                            yield f"data: {json.dumps({'type': 'thought', 'message': msg}, ensure_ascii=False)}\n\n"
                        except asyncio.TimeoutError:
                            pass
                    await tool_task
                    
                    # 剩余的 status_queue 全部吐出
                    while not status_queue.empty():
                        msg = status_queue.get_nowait()
                        yield f"data: {json.dumps({'type': 'thought', 'message': msg}, ensure_ascii=False)}\n\n"
                        
                    # 发送工具结果
                    yield f"data: {json.dumps({'type': 'tool_done', 'name': func_name, 'summary': '执行成功'}, ensure_ascii=False)}\n\n"
                    
                    # 如果生成了可下载的文件，即刻推送到前端
                    if generated_file_info:
                        yield f"data: {json.dumps({'type': 'file_ready', **generated_file_info}, ensure_ascii=False)}\n\n"
                        
                    convo_messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "name": func_name,
                        "content": str(tool_result)
                    })
                    
            yield f"data: {json.dumps({'type': 'done'}, ensure_ascii=False)}\n\n"
            
        except Exception as e:
            err_str = f"Agent 执行异常: {str(e)}"
            print(f"[Agent Error] {e}")
            yield f"data: {json.dumps({'type': 'error', 'message': err_str}, ensure_ascii=False)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.get("/api/download/{filename}")
async def download_file(filename: str):
    """安全下载生成的 Word 公文或逐字稿"""
    # 路径安全防护，防止目录穿越
    clean_name = os.path.basename(filename)
    target_file = OUTPUTS_DIR / clean_name
    
    if not target_file.exists():
        raise HTTPException(status_code=404, detail="文件不存在或已被系统自动回收")
        
    media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    if clean_name.endswith(".txt"):
        media_type = "text/plain; charset=utf-8"
        
    return FileResponse(
        path=str(target_file),
        filename=clean_name,
        media_type=media_type
    )

@app.get("/api/admin/logs")
async def get_admin_logs(limit: int = 50):
    """查看最近的系统访问与使用审计日志"""
    if not AUDIT_LOG_FILE.exists():
        return {"logs": []}
    with open(AUDIT_LOG_FILE, "r", encoding="utf-8") as f:
        lines = f.readlines()
    return {"logs": lines[-limit:]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8502, reload=True)
