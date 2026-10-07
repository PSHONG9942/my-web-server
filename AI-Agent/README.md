# 教师专属 Office & 多模态 AI-Agent 后端服务配置指南

本服务为 **教师专属 Office & 多模态公文助理 (Minit Curai)** 的核心后端，运行于 **端口 8502**（注意：教学影音下载助手占用的是 8503，二者端口独立运行）。

---

## 🐧 Linux Mint 服务器端完整配置流程

### 第一步：同步最新代码至 Linux Mint 服务器
请确保将本次修改后的最新代码（包含性能优化与防爆内存逻辑的 `app.py`、`deploy_linux.sh` 等）更新到 Linux Mint 机器上的 `AI-Agent` 目录中。
- 若通过 Git 管理：
  ```bash
  cd ~/my-web-server
  git pull
  ```
- 或通过 SCP / 局域网共享将 Windows 上的 `AI-Agent` 文件夹同步至 Linux Mint。

---

### 第二步：一键安装依赖与启动后台服务 (systemd)
进入服务器上的 `AI-Agent` 目录，执行部署脚本：
```bash
cd ~/my-web-server/AI-Agent
chmod +x deploy_linux.sh
./deploy_linux.sh
```
该脚本会自动：
1. 安装 Linux 系统的 `ffmpeg`、`python3-venv`、`python3-pip` 等必要底层依赖；
2. 创建独立虚拟环境 `venv` 并安装 Python 依赖（Faster-Whisper, FastAPI, OpenCV 等）；
3. 注册并启动开机自启常驻服务 `ai-agent.service`（监听 **`0.0.0.0:8502`**）。

#### 常用服务运维命令：
- **查看运行状态**：
  ```bash
  sudo systemctl status ai-agent
  ```
- **重启服务**（更新代码后执行）：
  ```bash
  sudo systemctl restart ai-agent
  ```
- **查看实时日志**：
  ```bash
  journalctl -u ai-agent -f
  ```

---

### 第三步：永久固定公网隧道地址 (ngrok 专属网关)

系统已配置单一永久固定公网隧道，免除每次重启需重新配置的烦恼：
- **统一公网网关地址**：`https://swimming-easiness-strewn.ngrok-free.dev`
- **后台 systemd 服务**：`ngrok.service` 开机自动守护，自动将请求分发至：
  - `8502`: AI-Agent 智能公文服务（包含多模态视觉与 Whisper）
  - `8503`: 视频下载助手服务
  - `8505`: PDF 结构化转 PPTX 服务

#### 常用服务运维命令：
- **查看各服务状态**：
  ```bash
  sudo systemctl status ai-agent --no-pager
  sudo systemctl status yt-dlp-service --no-pager
  sudo systemctl status ngrok --no-pager
  ```
- **更新 AI-Agent 代码后重启**：
  ```bash
  sudo systemctl restart ai-agent
  ```

---

### 第四步：在网页端使用

1. 打开浏览器访问：
   **`https://sjkcabm.pages.dev/tools/ai_agent`**（或本地 `tools/ai-agent.html`）。
2. 网页已默认配置连接至 `https://swimming-easiness-strewn.ngrok-free.dev`，开箱即用。
3. 状态栏显示 **`🟢 Agent 引擎在线 (v2.0.0)`** 即代表对接成功。

---

## 📹 关于数 GB 超大会议录屏在网页中的处理

针对教师日常长达数小时、体积多达数 GB（如 6.75 GB）的录屏视频，网页端现已深度集成两大核心能力：

### 方案 A：🚀 服务器端高速分片直传（零门槛 · 全自动）
- **100% 网页内完成**：无需安装任何客户端软件或运行批处理脚本！
- **自动分片流传输**：拖入任意体积的大视频（哪怕 10GB+），网页自动切分为 10MB 分片流式上传，实时显示传输百分比、速率与剩余时间，100% 突破网络隧道请求体限制与超时问题。
- **服务器原生处理**：上传完毕后，Linux 服务器的原生多核 GPU/CPU 自动提取语音、分析 PPT 幻灯片，一键生成 Minit Curai 公文。

### 方案 B：🗜️ 像 compress.lol 一样纯浏览器本地处理（0 消耗流量）
- 在网页左侧切换至 **【🗜️ 压缩工坊 (compress.lol)】**。
- **纯浏览器本地环境**：无需安装任何额外软件或配置环境，直接利用浏览器本地计算能力，秒级提取出仅数十兆的纯音频 MP3。
- 提取完成后，点击 **【一键填入素材箱并写公文】** 即可秒级开启 AI 公文生成！
