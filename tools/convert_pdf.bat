@echo off
chcp 65001 > nul
title PDF 转 PPTX 高清转换器 (无文件大小限制)

echo ========================================================
echo  🚀 PDF 转 PPTX 高清转换器 (基于 PyMuPDF + python-pptx)
echo  ⚡ 突破第三方网站 15MB 限制 · 专为 24MB+ 大文件优化
echo ========================================================
echo.

if "%~1"=="" (
    echo [使用说明]
    echo 1. 你可以直接将 .pdf 文件直接拖拽到本批处理图标上转换；
    echo 2. 或者在下方直接粘贴 PDF 完整路径：
    echo.
    set /p "INPUT_PDF=请输入 PDF 文件路径: "
) else (
    set "INPUT_PDF=%~1"
)

:: 去除两端可能多余的引号
set "INPUT_PDF=%INPUT_PDF:"=%"

if not exist "%INPUT_PDF%" (
    echo.
    echo [错误] 文件未找到: "%INPUT_PDF%"
    echo.
    pause
    exit /b 1
)

echo.
echo 正在处理，请稍候...
echo.
python "%~dp0convert_pdf_to_pptx.py" "%INPUT_PDF%"

echo.
echo ========================================================
echo  ✅ 转换已完成！PPTX 文件已保存在原 PDF 同级目录下。
echo ========================================================
echo.
pause
