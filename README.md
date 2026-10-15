# 🇲🇾 华小老师专区 (SJK(C) Digital Teaching Tools Hub)

> **专为马来西亚华小（SJK(C)）教师量身打造的免费数字化备课教具、课堂互动游戏与 AI 效率工坊。**  
> 一人开发、持续进化、免安装即开即用、专为课室触控一体机（Smart Board）深度优化。

[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Smart%20Board%20%7C%20Mobile-blue.svg)](#)
[![Tech](https://img.shields.io/badge/Tech-HTML5%20%7C%20Vanilla%20JS%20%7C%20Python%20FastAPI-green.svg)](#)
[![Status](https://img.shields.io/badge/Status-Active%20%26%20Growing-brightgreen.svg)](#)
[![Network](https://img.shields.io/badge/Network-Tailscale%20Direct%20Connect-blueviolet.svg)](#)

---

## 🌟 项目初衷与理念 (About The Project)

在马来西亚华小一线教学与备课实践中，华文、数学、科学与英语教师常常面临诸多现实痛点：
1. **多软件反复横跳**：制作一份带笔顺动画与田字格的课件，需要在汉字生成器、动图下载器、排版软件与 PowerPoint 之间多次手动复制粘贴。
2. **课室网络卡顿断联**：课堂播放线上视频常常卡在转圈等待，急需可靠、纯净的影音离线提取与本地播放方案。
3. **繁琐的行政公文**：参加校外培训或校内会议后，需手动整理速记并撰写教育局规范的 *Minit Curai*（会议摘要备忘录）。
4. **高质量本土教具匮乏**：市面缺少契合大马华小课程标准（KSSR Semakan）的识字、拼音、竖式计算与经典国情桌游（如 Master Malaysia、Jutaria、Sahibba）。

本项目由**潘老师**（马来西亚在职华小教师）利用业余时间独立设计与全栈构建，以**“极简轻量、离线优先（Offline First）、触控友好、高质直出”**为核心理念，打造全方位的数字化教学利器矩阵。

---

## 🛠️ 核心功能与工具矩阵 (Tools & Features)

### 1. 📽️ 智能备课与课件直出工坊
* **[生字笔顺 PPTX 课件生成器](tools/hanzi-to-pptx.html)** 🌟：
  * **一站式闭环**：输入字词，系统自动以空格分列并智能匹配标准汉语拼音、部首与笔画数。
  * **1:1 数学级方正田字格**：虚线十字精准平分四象限，笔顺动图在网页、全屏大屏与 PPT 课件中 100% 满格方正居中、零拉伸形变。
  * **Smart Board 专属优化**：全屏演示模式常驻防误触的高对比度红色【✕ 退出全屏】触控按钮及翻页、调速、重播悬浮工具条。
  * **书写速度调节**：支持 0.5x ~ 2.5x 无级平滑变速与 5 档快捷预设（0.7x 极缓、0.9x 较慢、1.2x 标准、1.6x 较快、2.0x 极速）。
  * **一键直出 PPTX**：严格按 16:9 宽屏版式打包生成微软 PowerPoint 课件，生字动图已烘焙内置，脱机双击即可直接授课。
* **[习字簿生成器](tools/standard.html)**：支持标准版、一年级专用版与部首版，一键生成符合华小规范的田字格生字字帖，并支持无损高清导出 PDF 打印。
* **[趣味汉字笔顺生成器](tools/chinese-stroke-generator/index.html)**：基于矢量动画引擎，直观展示部首分色笔顺书写轨迹，支持导出透明背景 GIF 动图。
* **[PDF 转 PPTX 转换器](tools/pdf-to-pptx.html)**：打破第三方商业网站的文件体积限制，在本地浏览器与自建算力后台快速将数十兆的教学课件与教材转为可编辑 PPT 幻灯片。

### 2. 🎬 影音算力与 AI 效率助理
* **[教学影音下载助手](tools/video-downloader.html)**：
  * 支持 YouTube、Bilibili、TikTok 等全网主流影音平台的教学视频无水印高清抓取与 MP3 听力音频秒级提取。
  * 突破平台 Bot Check 防爬拦截，支持巨型播放列表（400+ 视频）防遗漏打包下载与同源 Blob 静默流式保存。
* **[大马教师专属 AI 助理](tools/ai-agent.html)**：
  * 上传会议或培训视频录屏，AI 自动切片音频识别语音（Whisper），同步提取演示文稿幻灯片要点。
  * 一键自动排版生成符合马来西亚教育标准的 **Minit Curai** 官方格式文书，彻底告别熬夜手打。
* **[AI 创造营 & 创意画廊](tools/ai-creator.html)**：用自然语言大白话提出教学需求，AI 程序员现场编写并在右侧实时渲染出专属的教学小工具与互动游戏，支持一键发布至 [全校创意画廊](creator-gallery.html)。

### 3. 🎮 经典本土桌游与跨学科游戏复刻
* **[Master Malaysia (马来西亚大师)](master-malaysia/dist/index.html)**：
  * 深度数字化复刻 2008 年马来西亚经典国情益智桌游！
  * 全盘 52 格，涵盖土地（Land）、人物（People）、文化（Culture）与遗产（Heritage）四大领域及常识风险题（Risk）。
  * 支持 2~4 人本地同屏轮流对战、中/英/马三语界面与掷骰得分系统。
* **[Jutaria 数字化大富翁](tools/game.html)**：基于马来西亚本土城市地图的大富翁游戏，支持 2~4 人买地、建房、收租对决。
* **[Scrabble](tools/scrabble.html)** & **[Sahibba 马来文拼字](tools/sahibba.html)**：原汁原味还原英文与马来文经典拼字桌面游戏，内置词典校验机制。
* **[LEXI-CADE 英语赛博街机](tools/lexi-arcade/index.html)**：以英语语法规则与词汇辨析为底层格斗逻辑的街机动作对决游戏。
* **[Kirable 数字桌游](tools/kirable.html)**：极简几何美学数学拼算式游戏，支持人机对战与智能防作弊。

### 4. 🔤 华语拼音与语言游戏矩阵
* **[拼音大挑战](tools/pinyin.html)**：声母、韵母与声调阶梯闯关。
* **[跃音登天阁](tools/pinyin_ascent.html)**：0秒重开的冲梯竞速，针对易错声韵调设防。
* **[拼音探秘](tools/pinyin_advanced.html)** & **[拼音工坊](tools/pinyin_game.html)**：拼音猜句与汉字注音交互实战。
* **[语文型贪食蛇](tools/radical-snake/index.html)**：操控贪食蛇寻找指定部首汉字，寓教于乐。
* **[AI 趣味造句](tools/ai-sentence.html)**、**[AI 语法纠错](tools/grammar.html)** 与 **[AI 互动填词](tools/ai-cloze.html)**：智能多语种句型生成与词汇巩固。
* **[HANGMAN 大冒险](tools/hangman/index.html)** & **[Diary Buddy 英文日记助手](diary-buddy/index.html)**：低年级趣味单词背诵与假日写作支架。

### 5. 🧮 科学探险与校园行政辅助
* **[科学探险岛](science/index.html)**：小学科学课程标准（KSSR）交互式实验与课件库。
* **[点名簿生成器](tools/attendance/index.html)**：输入学生名单，自动排版生成符合标准表格的点名格与 PDF 打印文件。
* **[竖式解题助手](tools/solver.html)**：完整呈现加减乘除详细进位退位计算步骤，辅助作业批改与订正讲解。
* **[3D 家族关系星系](family-tree-network/index.html)**：支持自然语言推导的“亲戚关系计算器”，并渲染出璀璨的 3D 全息星系家族谱。
* **[牛马退休日记](tools/pencen.html)**：教师专属摸鱼倒计时小工具。
* **[潘老师的创意宇宙与百宝箱](archive.html)** 🏛️：
  * 完整收录 67 款跨越开发中、服役中与先驱探索期的个人项目全貌。
  * *彩蛋*：在首页连续点击上方 Logo 图标 5 次即可直接进入档案馆。

---

## 🏛️ 技术架构与工程实现 (Technical Architecture)

```
┌────────────────────────────────────────────────────────────────┐
│                   前端展示与交互层 (Client)                      │
│   • 纯原生 Web: HTML5 / Vanilla CSS3 / ES6+ JavaScript         │
│   • 离线优先架构 (大部分工具单文件即开即用，无需 Node 打包)            │
│   • Smart Board 电子白板触控交互优化 (防误触悬浮条 / 大按键)       │
└───────────────▲───────────────────────────────▲────────────────┘
                │ HTTP / REST                   │ WebSocket / Streaming
┌───────────────▼───────────────────────────────▼────────────────┐
│               自建算力微服务群 (Python FastAPI)                 │
│                                                                │
│  [yt-dlp-service]     [AI-Agent]            [pdf-service]      │
│  • yt-dlp 高清解析    • Whisper 语音转录    • PyMuPDF (fitz)   │
│  • ffmpeg 音频提取    • Gemini 多模态视觉   • python-pptx 转换 │
│  • 播放列表批量打包   • Minit Curai 官函排版 • 矢量版式高保真   │
└───────────────────────────────▲────────────────────────────────┘
                                │
┌───────────────────────────────┴────────────────────────────────┐
│                 Tailscale 专属永久内网穿透隧道                   │
│   • 毫秒级直连响应 / 无限流量带宽 / 7x24 小时 systemd 守护自愈    │
└────────────────────────────────────────────────────────────────┘
```

* **极致轻量**：坚持使用原生 HTML/CSS/JS 编写绝大多数工具，无需繁重的框架打包和安装，浏览器打开即用，秒级加载。
* **离线安全**：工具设计优先考虑脱机环境，学校断网或使用 U 盘拷入教学电脑也能稳定运转。
* **永久稳定算力**：多媒体和 AI 等重型任务由本地自建算力服务器托管，采用 **Tailscale 永久隧道** 直连，彻底根除第三方穿透工具的流量配额与域名变动问题。

---

## 📂 项目目录结构 (Directory Structure)

```text
my-web-server/
├── index.html                  # 门户主页（包含所有核心教具卡片）
├── updates.html                # 系统详细版本更新日志
├── archive.html                # 潘老师的创意宇宙与百宝箱（67款项目全景）
├── creator-gallery.html        # AI 创造营师生作品画廊
│
├── tools/                      # 教学工具与互动网页应用集合
│   ├── hanzi-to-pptx.html      # 📽️ 生字笔顺 PPTX 课件生成器
│   ├── video-downloader.html   # 🎬 教学影音下载助手
│   ├── pdf-to-pptx.html        # 📑 PDF 转 PPTX 转换器
│   ├── ai-agent.html           # 🤖 大马教师专属 AI 助理
│   ├── standard.html           # ✍️ 习字簿生成器 (标准版)
│   ├── grade1.html             # ✍️ 习字簿生成器 (一年级版)
│   ├── radical.html            # ✍️ 习字簿生成器 (部首版)
│   ├── pinyin.html             # 🔤 拼音大挑战
│   ├── pinyin_ascent.html      # ⛩️ 跃音登天阁
│   ├── solver.html             # 🧮 竖式解题助手
│   ├── attendance/             # 📋 点名簿生成器
│   ├── chinese-stroke-generator/# 🖌️ 趣味汉字笔顺生成引擎
│   ├── lexi-arcade/            # ⚔️ LEXI-CADE 赛博英语街机
│   └── ...                     # 其余数十款语言、数学与校园工具
│
├── master-malaysia/            # 🇲🇾 2008年经典大马国情益智桌游复刻 (React 19)
├── family-tree-network/        # 🧬 3D 家族关系星系与亲戚雷达
├── diary-buddy/                # 📖 英文假期日记辅助助手
├── science/                    # 🔬 小学科学探险岛模块
├── css/                        # 全局样式库（赛博朋克风与响应式设计）
├── images/                     # 站点资源图标与图片
│
├── yt-dlp-service/             # 🐍 影音解析下载后端服务 (Python FastAPI)
├── AI-Agent/                   # 🐍 视频会议转录与公文排版服务 (Whisper + Gemini)
└── pdf-service/                # 🐍 高清课件转幻灯片后端服务 (PyMuPDF + PPTX)
```

---

## 🚀 快速开始与本地运行 (Quick Start)

### 1. 运行前端主站
本项目前端为纯静态网页，无需配置繁重的 Node 构建环境即可运行：

#### 方式 A：使用 Python 内置简易服务器（推荐）
```bash
# 进入项目根目录
cd my-web-server

# 启动本地 HTTP 服务（端口 8000）
python -m http.server 8000
```
在浏览器中打开：`http://localhost:8000`

#### 方式 B：使用 Node.js / npx
```bash
npx serve . -p 8000
```

#### 方式 C：直接双击打开
对于大部分基础教具（如 `tools/hanzi-to-pptx.html`、`tools/standard.html` 等），直接在文件管理器中双击 `.html` 文件即可在浏览器中离线使用。

---

### 2. 运行后端算力微服务（可选）
如果您需要在本地独立部署影音解析、AI 会议速记或 PDF 转换的算力节点：

#### 影音下载服务 (`yt-dlp-service`)
```bash
cd yt-dlp-service
pip install -r requirements.txt
# Windows:
start_windows.bat
# Linux:
python app.py
```
*默认监听端口：8503*

#### PDF 转 PPTX 服务 (`pdf-service`)
```bash
cd pdf-service
pip install -r requirements.txt
# Windows:
start_windows.bat
# Linux:
python app.py
```
*默认监听端口：8505*

#### AI 会议助理服务 (`AI-Agent`)
```bash
cd AI-Agent
pip install -r requirements.txt
# 配置 .env 中的 GEMINI_API_KEY
python app.py
```
*默认监听端口：8502*

---

## 💡 课室白板教学技巧 (Smart Board Tips)

1. **生字课件教学**：
   * 在 [生字笔顺课件生成器](tools/hanzi-to-pptx.html) 中输入生字词语（用空格分隔词语，例如：`青蛙 想 捉 荷叶 跳`）。
   * 点击右上角 **【🖥️ 全屏演示】**，一体机屏幕将立即铺满方正田字格。
   * 点击右上角红色 **【✕ 退出全屏】** 可随时回到编辑面板；触控悬浮条支持现场快速切速（极缓~极速）与单字动图无限循环重播。
   * 点击 **【📥 导出 PPTX 课件】**，可将整份课件保存至电脑，上课断网亦可全功能播放。
2. **多媒体离线授课**：
   * 提前使用 [教学影音下载助手](tools/video-downloader.html) 将 YouTube / Bilibili 教学短片解析并保存至 U 盘，彻底避免课室高峰期网络塞车。

---

## 📅 更新日志与维护动态 (Changelog)

详细的功能迭代记录、Bug 修复与架构优化，请参阅：  
👉 **[updates.html (在线更新日志)](updates.html)**

---

## 📬 反馈与交流 (Contact & Feedback)

本项目由一线教师一人利用课余时间独立开发维护，由于精力有限，功能不定期更新，恳请各位老师与同行体谅与支持。

* **维护者**：潘老师 (Pan Laoshi)
* **电子邮箱**：`g-21543731@moe-dl.edu.my`
* **意见反馈**：欢迎将教学过程中的使用心得、排版建议或新增字词需求直接发至上述邮箱。

---

*“无论是想找个趁手的备课利器，还是想带学生探索数字世界的无限可能，这里都有属于你的宝藏。”*
