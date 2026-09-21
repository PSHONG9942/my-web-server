# yt-dlp 影音下载后端服务说明

## 🌐 当前线上 API 网址
- **Cloudflare Tunnel 公网地址**：`https://birmingham-bumper-hills-noticed.trycloudflare.com`
- **本地回环地址**：`http://127.0.0.1:8503`

- **前端工具页面**：已默认配置该 Cloudflare Tunnel 地址，用户访问网页无需额外设置即可直连下载。

---

## 🚀 Linux Mint 服务器管理命令

### 1. 管理 yt-dlp 后台服务 (systemd)
- 查看状态：`sudo systemctl status yt-dlp-service`
- 重启服务：`sudo systemctl restart yt-dlp-service`
- 查看实时日志：`journalctl -u yt-dlp-service -f`

### 2. 保持 Cloudflare Tunnel 在后台常驻运行
当前通过终端运行的 `cloudflared tunnel --url http://localhost:8503` 在关闭终端后可能会退出。
如需让它在后台持续运行，可以使用以下简易命令：

```bash
nohup cloudflared tunnel --url http://localhost:8503 > /tmp/cloudflared.log 2>&1 &
```

或者使用 `tmux` / `screen`：
```bash
tmux new -s tunnel
cloudflared tunnel --url http://localhost:8503
# 按 Ctrl+B 然后按 D 即可让其在后台挂起运行
```
