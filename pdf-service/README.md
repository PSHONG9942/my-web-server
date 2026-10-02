# PDF to PPTX 高清转换微服务

## 🌐 当前线上 API 网址
- **ngrok 永久固定公网地址**：`https://swimming-easiness-strewn.ngrok-free.dev`
- **本地回环地址**：`http://127.0.0.1:8505` (独立微服务) / `http://127.0.0.1:8503` (综合服务)

- **前端工具页面**：[tools/pdf-to-pptx.html](../tools/pdf-to-pptx.html) 已默认配置该公网地址，访问网页直接连通自建后端算力。

---

## 🚀 接口说明

### 1. 状态检测
`GET /api/pdf/status`
返回引擎运行状态、PyMuPDF / python-pptx 安装情况与支持的功能特性。

### 2. PDF 元数据与缩略图提取
`POST /api/pdf/info`
传入 `file` (multipart/form-data)，返回页数、文档比例、以及第 1 页的高清缩略图 base64。

### 3. PDF 转换任务提交
`POST /api/pdf/convert`
- 表单参数：
  - `file`: 上传的 PDF 文件（无文件大小限制，支持 24MB、50MB+）
  - `mode`: `presentation`（视网膜高清演示，100% 保真） / `hybrid`（混合可编辑文本）
  - `dpi`: `150` / `180` / `200` / `300`
  - `page_range`: `all` 或例如 `1-10, 15`
- 返回：`{"task_id": "...", "filename": "example.pptx"}`

### 4. 任务状态轮询与进度
`GET /api/pdf/tasks/{task_id}`
返回进度百分比（`progress`）、当前渲染页码（`current_page`）、总页数（`total_pages`）与阶段信息。

### 5. 下载转换好的 PPTX 文件
`GET /api/pdf/tasks/{task_id}/file`

---

## 🛠️ 管理与部署命令

### 独立微服务运行 (端口 8505)
- **Windows**: 双击 `start_windows.bat`
- **Linux**: 执行 `bash deploy_linux.sh`
