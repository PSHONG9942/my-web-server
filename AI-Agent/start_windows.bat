@echo off
chcp 65001 > nul
title 教师专属 Office & 多模态 AI-Agent 后端服务 (端口: 8502)

echo ========================================================
echo  🤖 正在启动 教师专属 Office & 多模态 AI-Agent 后端服务
echo ========================================================
echo.

cd /d "%~dp0"

:: 1. 检查 Python 环境
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [❌ 错误] 未检测到 Python，请先安装 Python 3.10+ 并勾选 "Add python.exe to PATH"。
    echo.
    pause
    exit /b 1
)

:: 2. 检查 FFmpeg 环境
ffmpeg -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [⚠️ 警告] 未检测到 FFmpeg，音视频快速切片与转录可能受影响。建议安装 FFmpeg 并加入系统环境变量。
) else (
    echo [✅ 环境检测] Python 与 FFmpeg 均已就绪！
)

echo.
echo ========================================================
echo  🌐 本地 API 地址: http://127.0.0.1:8502
echo  📖 API 交互文档: http://127.0.0.1:8502/docs
echo.
echo  💡 前端对接说明:
echo  1. 如果在当前电脑本地打开 tools/ai-agent.html，
echo     右上角配置地址直接填写: http://127.0.0.1:8502
echo.
echo  2. 如果要在外网通过 Cloudflare Tunnel 访问:
echo     另开一个终端窗口运行:
echo     cloudflared tunnel --url http://localhost:8502
echo     然后将生成的 https://xxxx.trycloudflare.com 填入前端配置。
echo.
echo  请保持此窗口开启，关闭窗口即可停止服务。
echo ========================================================
echo.

python -m uvicorn app:app --host 0.0.0.0 --port 8502 --reload

pause
