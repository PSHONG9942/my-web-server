# 教师专属 Office & 多模态 AI-Agent 后端服务说明

## 🌐 当前线上公网配置
- **Cloudflare Tunnel 公网地址**：`https://screensavers-spend-breed-phillips.trycloudflare.com`
- **本地回环地址**：`http://127.0.0.1:8502`
- **前端工具页面**：已默认配置该 Tunnel 地址，用户打开 [tools/ai-agent.html](file:///c:/Users/Admin/Desktop/my-web-server/tools/ai-agent.html) 即可直连。

---

## 🚀 Linux Mint / Ubuntu 服务器管理命令

### 1. 管理 AI-Agent 后台服务 (systemd)
- 查看运行状态：
  ```bash
  sudo systemctl status ai-agent
  ```
- 重启服务：
  ```bash
  sudo systemctl restart ai-agent
  ```
- 查看实时运行日志：
  ```bash
  journalctl -u ai-agent -f
  ```

### 2. 启动 Cloudflare Tunnel (映射到公网)
使用与 `yt-dlp-service` 完全相同的快速隧道指令：

```bash
cloudflared tunnel --url http://localhost:8502
```

终端启动后会输出类似如下的公网 HTTPS 地址：
```
https://xxxx-xxxx-xxxx.trycloudflare.com
```

#### 让 Tunnel 在后台常驻运行：
- **方案 A (简易 nohup)**：
  ```bash
  nohup cloudflared tunnel --url http://localhost:8502 > /tmp/cloudflared-agent.log 2>&1 &
  ```
  查看后台分配的网址：
  ```bash
  grep -o 'https://.*\.trycloudflare\.com' /tmp/cloudflared-agent.log
  ```

- **方案 B (tmux / screen 挂起，推荐)**：
  ```bash
  tmux new -s agent-tunnel
  cloudflared tunnel --url http://localhost:8502
  # 按 Ctrl+B 随后按 D 即可脱离并在后台保持运行
  ```

### 3. 前端对接
启动 Cloudflare Tunnel 后，只需打开前端页面 `tools/ai-agent.html`，点击右上角的 **⚙️ 后端配置**，将上面生成的 `https://xxxx.trycloudflare.com` 粘贴进去保存即可！配置会持久保存在浏览器本地，无需反复输入。

### 4. 审计与使用日志
系统会自动在 `logs/agent_access.log` 中记录所有上传与会话事件：
```bash
tail -f logs/agent_access.log
```
