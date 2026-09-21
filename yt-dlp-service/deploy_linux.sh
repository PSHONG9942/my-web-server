#!/bin/bash

echo "=================================================="
echo "🚀 开始部署 yt-dlp 影音下载后端服务 到 Linux Mint / Ubuntu"
echo "=================================================="

# 1. 更新系统并安装必要的环境 (ffmpeg, python3-venv, etc.)
echo "[1/4] 📦 正在检查/安装系统依赖 (ffmpeg, python3-venv, python3-pip)..."
sudo apt-get update
sudo apt-get install -y python3-venv python3-pip ffmpeg git

# 2. 创建虚拟环境
echo "[2/4] 🐍 正在创建 Python 虚拟环境..."
python3 -m venv venv
source venv/bin/activate

# 3. 安装 Python 依赖
echo "[3/4] 📚 正在安装 Python 依赖库..."
pip install --upgrade pip
pip install -r requirements.txt

# 4. 创建系统后台服务 (systemd)
echo "[4/4] ⚙️ 正在配置后台常驻守护服务 (systemd)..."
SERVICE_FILE=/etc/systemd/system/yt-dlp-service.service
CURRENT_DIR=$(pwd)
USER=$(whoami)

sudo bash -c "cat > $SERVICE_FILE <<EOF
[Unit]
Description=yt-dlp Media Downloader FastAPI Service
After=network.target

[Service]
User=$USER
WorkingDirectory=$CURRENT_DIR
ExecStart=$CURRENT_DIR/venv/bin/python -m uvicorn app:app --host 0.0.0.0 --port 8503
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF"

sudo systemctl daemon-reload
sudo systemctl enable yt-dlp-service
sudo systemctl restart yt-dlp-service

echo "=================================================="
echo "✅ 部署完成！"
echo "🌐 本地应用已在后台常驻运行，端口为 8503"
echo "可以通过 'sudo systemctl status yt-dlp-service' 查看运行状态"
echo "可以通过 'journalctl -u yt-dlp-service -f' 查看实时日志"
echo "=================================================="
