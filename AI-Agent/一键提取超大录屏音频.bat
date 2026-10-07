@echo off
chcp 65001 > nul
title 极速音视频无损提取工具 (专为超大录屏与会议公文设计)

set "TARGET_FILE=%~1"

python "%~dp0extract_audio.py" "%TARGET_FILE%"

if %errorlevel% neq 0 (
    echo.
    pause
)
