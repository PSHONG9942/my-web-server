#!/bin/bash

echo "=================================================="
echo "🚀 开始部署 PDF 转 PPTX 后端服务 到 Linux Mint / Ubuntu"
echo "=================================================="

# 1. 检查 Python 环境
echo "[1/4] 📦 正在检查/安装系统依赖 (python3-venv, python3-pip)..."
sudo apt-get update
sudo apt-get install -y python3-venv python3-pip git

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
SERVICE_FILE=/etc/systemd/system/pdf-to-pptx-service.service
CURRENT_DIR=$(pwd)
USER=$(whoami)

sudo bash -c "cat > $SERVICE_FILE <<EOF
[Unit]
Description=PDF to PPTX FastAPI Conversion Service
After=network.target

[Service]
User=$USER
WorkingDirectory=$CURRENT_DIR
ExecStart=$CURRENT_DIR/venv/bin/python -m uvicorn app:app --host 0.0.0.0 --port 8505
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF"

sudo systemctl daemon-reload
sudo systemctl enable pdf-to-pptx-service
sudo systemctl restart pdf-to-pptx-service

echo "=================================================="
echo "✅ 部署完成！"
echo "🌐 本地应用已在后台常驻运行，端口为 8505"
echo "可以通过 'sudo systemctl status pdf-to-pptx-service' 查看运行状态"
echo "可以通过 'journalctl -u pdf-to-pptx-service -f' 查看实时日志"
echo "=================================================="
