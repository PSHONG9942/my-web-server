#!/bin/bash

echo "=================================================="
echo "🚀 开始部署 AI-Agent 到 Linux Mint 服务器"
echo "=================================================="

# 1. 更新系统并安装必要的环境
echo "[1/4] 📦 正在安装系统依赖 (ffmpeg, python3-venv)..."
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
echo "[4/4] ⚙️ 正在配置后台常驻服务 (守护进程)..."
SERVICE_FILE=/etc/systemd/system/ai-agent.service
CURRENT_DIR=$(pwd)
USER=$(whoami)

sudo bash -c "cat > $SERVICE_FILE <<EOF
[Unit]
Description=Streamlit AI-Agent Service
After=network.target

[Service]
User=$USER
WorkingDirectory=$CURRENT_DIR
ExecStart=$CURRENT_DIR/venv/bin/streamlit run app.py --server.port 8502
Restart=always

[Install]
WantedBy=multi-user.target
EOF"

sudo systemctl daemon-reload
sudo systemctl enable ai-agent
sudo systemctl restart ai-agent

echo "=================================================="
echo "✅ 部署完成！"
echo "🌐 本地应用已在后台运行，端口为 8502"
echo "可以通过 'sudo systemctl status ai-agent' 查看运行状态"
echo "=================================================="
