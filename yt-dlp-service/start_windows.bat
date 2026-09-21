@echo off
chcp 65001 > nul
title yt-dlp 影音下载后端服务 (FastAPI)

echo ========================================================
echo  🎬 正在启动 yt-dlp 影音下载后端服务 (端口: 8503)
echo ========================================================

cd /d "%~dp0"

:: 检查 Python 是否已安装
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Python，请先安装 Python 3.10+ 并勾选 Add to PATH。
    pause
    exit /b 1
)

:: 检查并创建虚拟环境（可选但推荐，保持环境干净）
if not exist "venv" (
    echo [1/3] 正在创建 Python 虚拟环境 (venv)...
    python -m venv venv
)

echo [2/3] 正在激活虚拟环境并安装/检查依赖...
call venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt

echo [3/3] 依赖就绪，正在启动服务...
echo.
echo ========================================================
echo  ✅ 服务已在后台启动！
echo  🌐 本地 API 地址: http://127.0.0.1:8503
echo  📖 API 文档地址: http://127.0.0.1:8503/docs
echo  请保持此窗口开启。关闭此窗口即可停止服务。
echo ========================================================
echo.

python -m uvicorn app:app --host 0.0.0.0 --port 8503 --reload

pause
