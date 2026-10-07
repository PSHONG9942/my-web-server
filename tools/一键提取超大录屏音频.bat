@echo off
chcp 65001 > nul
title 教师专属录屏极速提取纯音频工具

echo ========================================================
echo  教师会议录屏极速提取音频工具 (提取后仅 ~30MB 秒传素材箱)
echo ========================================================

set "INPUT_FILE=%~1"

if "%INPUT_FILE%"=="" (
    echo.
    echo [使用说明]
    echo 请直接将数 GB 的会议录屏视频拖拽到本批处理图标上！
    echo.
    pause
    exit /b
)

:: 去除两端引号
set "INPUT_FILE=%INPUT_FILE:"=%"
set "OUTPUT_MP3=%~dpn1_纯音频.mp3"

:: 1. 查找 ffmpeg 可执行文件
set "FFMPEG_BIN="
where ffmpeg >nul 2>&1 && set "FFMPEG_BIN=ffmpeg"

if not defined FFMPEG_BIN (
    if exist "%~dp0ffmpeg.exe" set "FFMPEG_BIN=%~dp0ffmpeg.exe"
    if exist "C:\ffmpeg\bin\ffmpeg.exe" set "FFMPEG_BIN=C:\ffmpeg\bin\ffmpeg.exe"
    if exist "%ProgramFiles%\ffmpeg\bin\ffmpeg.exe" set "FFMPEG_BIN=%ProgramFiles%\ffmpeg\bin\ffmpeg.exe"
    for /d %%D in ("%LOCALAPPDATA%\Microsoft\WinGet\Packages\yt-dlp.FFmpeg*") do (
        for /r "%%D" %%F in (ffmpeg.exe) do (
            if exist "%%F" set "FFMPEG_BIN=%%F"
        )
    )
    for /d %%D in ("%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg*") do (
        for /r "%%D" %%F in (ffmpeg.exe) do (
            if exist "%%F" set "FFMPEG_BIN=%%F"
        )
    )
)

:: 2. 如果电脑未安装 ffmpeg，尝试通过 winget 自动安装
if not defined FFMPEG_BIN (
    echo.
    echo ⚠️ 正在检测转码组件... 未在系统 PATH 中找到 FFmpeg。
    where winget >nul 2>&1
    if %errorlevel% equ 0 (
        echo 正在通过 Windows 包管理器为您一键安装转码组件 (仅需首次执行一次)...
        winget install yt-dlp.FFmpeg --accept-package-agreements --accept-source-agreements
        where ffmpeg >nul 2>&1 && set "FFMPEG_BIN=ffmpeg"
    )
)

if not defined FFMPEG_BIN (
    echo.
    echo ========================================================
    echo  ❌ 提取未开始：当前电脑尚未安装 FFmpeg 视频转码组件。
    echo ========================================================
    echo  【极速替代解决方案】：
    echo  1. 用电脑上的【剪映 (CapCut)】打开该视频，点击右上角【导出】-> 勾选【仅导出音频 (MP3)】；
    echo  2. 或在电脑终端 (PowerShell) 中输入: winget install yt-dlp.FFmpeg 一键安装；
    echo  3. 导出获得 ~30MB 的 MP3 纯音频后，直接拖入网页【会议素材箱】即可秒传写公文！
    echo ========================================================
    echo.
    pause
    exit /b 1
)

echo.
echo 正在极速提纯音频（去除 99%% 无用画面），请稍候...
echo 输入视频: "%INPUT_FILE%"
echo 输出音频: "%OUTPUT_MP3%"
echo.

"%FFMPEG_BIN%" -y -i "%INPUT_FILE%" -vn -ar 16000 -ac 1 -ab 64k "%OUTPUT_MP3%"

if exist "%OUTPUT_MP3%" (
    echo.
    echo ========================================================
    echo  🎉 提取成功！纯音频已生成：
    echo  "%OUTPUT_MP3%"
    echo.
    echo  💡 请直接将该 MP3 拖入网页【会议素材箱】即可秒传写公文！
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo  ❌ 提取异常，未能生成音频文件。请检查源视频是否损坏或被占用。
    echo ========================================================
)

echo.
pause
