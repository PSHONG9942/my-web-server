import sys
import os
import subprocess
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

def format_size(bytes_num):
    if bytes_num < 1024:
        return f"{bytes_num} B"
    elif bytes_num < 1024 * 1024:
        return f"{bytes_num / 1024:.2f} KB"
    elif bytes_num < 1024 * 1024 * 1024:
        return f"{bytes_num / (1024 * 1024):.2f} MB"
    else:
        return f"{bytes_num / (1024 * 1024 * 1024):.2f} GB"

def select_file():
    try:
        import tkinter as tk
        from tkinter import filedialog
        root = tk.Tk()
        root.withdraw()
        root.attributes("-topmost", True)
        file_path = filedialog.askopenfilename(
            title="请选择需要提取音频的超大会议录屏视频文件",
            filetypes=[
                ("视频录屏文件", "*.mp4 *.mkv *.mov *.webm *.avi *.flv *.ts *.wmv"),
                ("所有文件", "*.*")
            ]
        )
        return file_path
    except Exception:
        return ""

def main():
    print("=" * 65)
    print(" 🎙️ 教师专属超大录屏音轨极速提取工具")
    print(" ⚡ 突破浏览器内存与网络上传限制 · 6GB+ 巨型录屏 10 秒提取完成")
    print("=" * 65)
    print()

    input_file = ""
    if len(sys.argv) > 1 and sys.argv[1].strip():
        input_file = sys.argv[1].strip().strip('"').strip("'")
    
    if not input_file or not os.path.exists(input_file):
        print("💡 未检测到拖拽传入的文件，正在弹出窗口请选择视频...")
        input_file = select_file()

    if not input_file or not os.path.exists(input_file):
        print("❌ 未选择或找不到视频文件，操作已取消。")
        input("\n按回车键退出...")
        return

    in_path = Path(input_file)
    orig_size = in_path.stat().st_size
    print(f"🎬 视频文件: {in_path.name}")
    print(f"📊 原始体积: {format_size(orig_size)}")
    print(f"📂 所在目录: {in_path.parent}")
    print()

    out_name = f"{in_path.stem}_提取音频.mp3"
    out_path = in_path.parent / out_name

    print(f"⏳ 正在调用多核 FFmpeg 剥离画面并提取 16kHz 高保真语音音轨...")
    print(f"🎯 目标文件: {out_name}")
    print()

    cmd = [
        "ffmpeg", "-y", "-i", str(in_path),
        "-vn", "-ac", "1", "-ar", "16000",
        "-c:a", "libmp3lame", "-q:a", "4",
        str(out_path)
    ]

    try:
        process = subprocess.run(cmd, capture_output=True, text=True, errors="replace")
        if process.returncode != 0:
            print(f"❌ 提取失败: {process.stderr[-500:]}")
            input("\n按回车键退出...")
            return

        new_size = out_path.stat().st_size
        saved_pct = max(0.0, (orig_size - new_size) / orig_size * 100)

        print("=" * 65)
        print(" 🎉 音频极速提取完成！")
        print(f" 📂 生成文件: {out_path}")
        print(f" 📉 最终体积: {format_size(new_size)} (体积成功精简 {saved_pct:.1f}%!)")
        print()
        print(" 💡 接下来该怎么做？")
        print(" 1. 打开教师专属 AI-Agent 网页 (tools/ai-agent.html)")
        print(" 2. 将此提取出的轻量 MP3 音频直接拖入【📁 会议素材箱】")
        print(" 3. 几秒内即可极速完成上传，AI 将全自动为您生成标准 Minit Curai 公文！")
        print("=" * 65)
        print()

        # 在 Windows 资源管理器中高亮选中生成的文件
        try:
            subprocess.run(["explorer", f"/select,{out_path}"])
        except Exception:
            pass

    except Exception as e:
        print(f"❌ 执行异常: {e}")

    input("\n按回车键完成并退出...")

if __name__ == "__main__":
    main()
