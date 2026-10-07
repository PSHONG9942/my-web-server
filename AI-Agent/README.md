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

### 第三步：将 Linux Mint 的 8502 端口映射到公网

网页端（如 `sjkcabm.pages.dev`）需要一个带有 HTTPS 的公网地址才能访问你的 Linux Mint 机器。你可以任选以下两种方式之一：

#### 方案 A：Cloudflare Tunnel（强烈推荐 · 免费稳定 · 无弹窗警告）
在 Linux Mint 终端中运行：
```bash
cloudflared tunnel --url http://localhost:8502
```
终端会输出如下格式的公网 HTTPS 地址：
```text
https://xxxx-xxxx-xxxx.trycloudflare.com
```

> **后台常驻运行技巧**：
> ```bash
> nohup cloudflared tunnel --url http://localhost:8502 > /tmp/ai-agent-tunnel.log 2>&1 &
> # 查看生成的公网网址：
> grep -o 'https://.*\.trycloudflare\.com' /tmp/ai-agent-tunnel.log
> ```

---

#### 方案 B：ngrok
若你习惯使用 ngrok，**必须转发 8502 端口**（切勿转发为 8503）：
```bash
ngrok http 8502
```
运行后会得到形如：
```text
https://your-domain.ngrok-free.dev
```

---

### 第四步：在网页端配置并开始使用

1. 打开浏览器，访问前端网页：
   **`https://sjkcabm.pages.dev/tools/ai_agent`**（或本地 `tools/ai-agent.html`）。
2. 点击右上角 **⚙️ 引擎配置**（或点击红色状态球）：
   - 在【后端服务地址】中，粘贴上面步骤获取的公网地址：
     - 若用 Cloudflare Tunnel：`https://xxxx.trycloudflare.com`
     - 若用 ngrok：`https://xxxx.ngrok-free.dev`
     - 若电脑与 Linux Mint 在同一家庭/校园局域网：亦可直接填 `http://192.168.x.x:8502`
   - （可选）填入 Nvidia NIM API Key。
   - 点击 **保存配置**。
3. 观察右上角状态：
   - 绿色常亮：显示 **`🟢 Agent 引擎在线 (v2.0.0)`** 即代表对接完全成功！

---

## 📹 关于 6.75 GB 超大录屏在网页中处理的最佳姿势

公网穿透服务（Cloudflare Tunnel / ngrok 免费版）对单次 HTTP 请求有 **100MB 的硬性体积上限**，因此数 GB 的原始视频无法直接通过公网通道上传。

**最佳且最快的工作流程（仅需 10 秒）**：
1. 在本地电脑双击桌面上的 **【一键提取超大录屏音频.bat】**，将 6.75 GB 视频直接拖入图标。
2. 5 ~ 10 秒内，本地 FFmpeg 会无损提炼出 **~30MB** 的高清纯语音 MP3 文件。
3. 将此 30MB MP3 拖入网页的【📁 会议素材箱】，**2 秒极速上传到 Linux Mint 服务器**！
4. Linux Mint 上的 Faster-Whisper 多核引擎将全自动转录、AI 提炼议程，一键排版导出标准的 **Kertas Minit Curai** 官函 Word 文档！
