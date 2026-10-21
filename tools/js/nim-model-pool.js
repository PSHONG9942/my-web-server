/**
 * NVIDIA NIM Model Pool & Failover Service
 * 收集与聚合 NVIDIA NIM 当前所有自带 Free Endpoint 的 AI 大模型
 * 支持：多模态图文、深度推理、编程生成、Agent、机器翻译、安全护栏、语义嵌入与科学计算
 * 
 * 官方模型主页：https://build.nvidia.com/models?filters=nimType%3Anim_type_preview
 */

// 默认内置的 NVIDIA NIM API Key (亦可从 localStorage 动态读取)
const NIM_DEFAULT_API_KEY = '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';
const NIM_API_BASE_URL = 'https://integrate.api.nvidia.com/v1';

/**
 * 分类定义与元数据
 */
const NIM_CATEGORIES = {
    'all': { id: 'all', name: '全部模型', icon: '🌟' },
    'multimodal': { id: 'multimodal', name: '多模态与视觉', icon: '👁️' },
    'reasoning': { id: 'reasoning', name: '逻辑推理与编程', icon: '🧠' },
    'agentic': { id: 'agentic', name: 'Agent 智能体', icon: '🤖' },
    'translation': { id: 'translation', name: '语言翻译与语音', icon: '🌐' },
    'safety': { id: 'safety', name: '安全护栏与审核', icon: '🛡️' },
    'embedding': { id: 'embedding', name: '向量嵌入与检索', icon: '🔍' },
    'vision': { id: 'vision', name: '计算机视觉与姿态', icon: '📹' },
    'physical-ai': { id: 'physical-ai', name: '物理世界与生成', icon: '🌍' },
    'data-ml': { id: 'data-ml', name: '表格与关系预测', icon: '📊' },
    'scientific': { id: 'scientific', name: '科学计算与量子', icon: '🔬' }
};

/**
 * NVIDIA NIM 全量 Free Endpoint 模型池清单 (涵盖 build.nvidia.com 预览专区及主流模型)
 */
const NIM_MODEL_POOL = [
    // ---------------- 1. 多模态 / 图文大模型 ----------------
    {
        id: 'nvidia/nemotron-3.5-super-vl-120b-a12b',
        name: 'Nemotron 3.5 Super VL 120B (A12B)',
        provider: 'NVIDIA',
        category: 'multimodal',
        categoryName: '多模态与智能体推理',
        description: 'Nemotron 3.5 Super early-access reasoning model for agentic, coding, tool-calling, and multimodal workloads.',
        descriptionZh: 'NVIDIA 早期体验旗舰多模态推理模型（120B MoE / 12B 激活），专为智能体工作流、代码生成、复杂工具调用和图文解析量身打造。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['agent', 'coding', 'tool-calling', 'multimodal', 'reasoning'],
        endpointType: 'chat',
        contextWindow: '128K',
        bestFor: '高难度代码生成、看图解析网页结构、复杂 Agent 自动化工作流',
        badge: '🔥 旗舰多模态'
    },
    {
        id: 'stepfun-ai/step-5-preview',
        name: 'Step 5 Preview (阶跃星辰)',
        provider: 'Stepfun-ai',
        category: 'multimodal',
        categoryName: '百万上下文多模态 MoE',
        description: 'Preview of StepFun\'s Step 5: ~600B-total / 27B-active multimodal MoE (text and image in, text out) with 1M context, reasoning and tool calling.',
        descriptionZh: '阶跃星辰 Step-5 预览版：约 600B 总参数 / 27B 激活的超大多模态 MoE，支持 1M 超长上下文，图文输入输出与高级工具调用。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['multimodal', 'moe', '1m-context', 'reasoning', 'tool-calling'],
        endpointType: 'chat',
        contextWindow: '1M',
        bestFor: '全本教科书级大文本分析、超长文档跨模态推理、大型图表归纳',
        badge: '📚 1M超长上下文'
    },
    {
        id: 'deepseek-ai/deepseek-v4.1-flash',
        name: 'DeepSeek V4.1 Flash',
        provider: 'DeepSeek AI',
        category: 'multimodal',
        categoryName: '高吞吐极速多模态',
        description: '552B MoE, 8B active params with native multimodal support and lower API cost using smaller KV cache.',
        descriptionZh: '深度求索 552B MoE 架构（8B 激活），原生支持多模态输入，凭借压缩 KV Cache 技术实现极速响应与超低延迟。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['vision language model', 'moe', 'multimodal', 'low-latency'],
        endpointType: 'chat',
        contextWindow: '128K',
        bestFor: '教学课件配图解析、华小题目极速图文识别、实时互动答疑',
        badge: '⚡ 极速低延迟'
    },
    {
        id: 'z-ai/glm-5-3-flash',
        name: 'GLM 5 3 Flash (智谱AI)',
        provider: 'Z.ai',
        category: 'multimodal',
        categoryName: '混合稀疏注意力多模态',
        description: 'Multimodal 320B-total / 18B-active MoE with hybrid KDA and sparse MLA attention, native FP8 weights, reasoning and tool calling.',
        descriptionZh: '智谱 320B 总参数 / 18B 激活多模态 MoE，采用混合 KDA 与稀疏 MLA 注意力，原生 FP8 权重，具备高水准推理与工具调用能力。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['multimodal', 'moe', 'reasoning', 'tool-calling', 'fp8'],
        endpointType: 'chat',
        contextWindow: '128K',
        bestFor: '中文多模态教学素材提取、复杂图文题求解、中文结构化输出',
        badge: '🇨🇳 中文多模态'
    },
    {
        id: 'meta/muse-glimmer-30b',
        name: 'Muse Glimmer 30B',
        provider: 'Meta',
        category: 'multimodal',
        categoryName: '独立思考流多模态模型',
        description: 'Muse Glimmer 30B is a multimodal reasoning model accepting text and images, with native tool-calling and separate reasoning output.',
        descriptionZh: 'Meta 30B 多模态推理模型，接受图文输入，具备原生工具调用能力，支持输出分离的深层思考链（Reasoning Trace）。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['multimodal', 'reasoning', 'tool-calling', 'thinking-output'],
        endpointType: 'chat',
        contextWindow: '128K',
        bestFor: '数学思维题解析、图表解题步骤可视化呈现、教学推演',
        badge: '💡 独立思考链'
    },
    {
        id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning',
        name: 'Nemotron 3 Nano Omni 30B (A3B)',
        provider: 'NVIDIA',
        category: 'multimodal',
        categoryName: '全模态感知与推理',
        description: 'Nemotron 3 Nano Omni is an omni-modal reasoning model that understands images, video, speech, text.',
        descriptionZh: 'NVIDIA 30B A3B 全模态推理大模型，原生融合图像、视频、语音和文本四位一体理解。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['image-to-text', 'speech', 'video', 'omni-modal'],
        endpointType: 'chat',
        contextWindow: '64K',
        bestFor: '多媒体互动教具、视频课件语音问答、图文音视跨模态理解',
        badge: '🎙️ 全模态'
    },

    // ---------------- 2. 逻辑推理与代码编程 ----------------
    {
        id: 'google/gemma-4-31b-it',
        name: 'Gemma 4 31B IT',
        provider: 'Google',
        category: 'reasoning',
        categoryName: '密集型顶级编程与推理',
        description: 'Dense 31B model delivering frontier reasoning for coding, agentic workflows, and fine-tuning.',
        descriptionZh: 'Google 密集型 31B 指令微调模型，在代码生成、单文件 HTML/JS 构建、逻辑推理与微调泛化上具备行业顶尖表现。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['reasoning', 'coding', 'agentic', 'dense', 'instruct'],
        endpointType: 'chat',
        contextWindow: '128K',
        bestFor: '网页工具编写（AI创造营主力）、单文件小游戏构建、复杂代码重构',
        badge: '👑 编程主力'
    },
    {
        id: 'nvidia/nemotron-3-ultra-550b-a55b',
        name: 'Nemotron 3 Ultra 550B (A55B)',
        provider: 'NVIDIA',
        category: 'reasoning',
        categoryName: '旗舰 Mamba-Transformer MoE',
        description: 'Open, efficient hybrid Mamba-Transformer MoE with 1M context, excelling in agentic reasoning, coding, planning, tool calling, and more.',
        descriptionZh: 'NVIDIA 550B 超大规模混合 Mamba-Transformer MoE 架构，支持 1M 上下文，在复杂规划、高阶编程与工具调用方面综合性能卓越。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['agent', '1m-context', 'mamba', 'coding', '550b-flagship'],
        endpointType: 'chat',
        contextWindow: '1M',
        bestFor: '超长代码库重构、高复杂度多步逻辑规划、架构级技术方案生成',
        badge: '🚀 550B旗舰'
    },
    {
        id: 'openai/gpt-oss-20b',
        name: 'GPT OSS 20B (OpenAI Open Model)',
        provider: 'OpenAI',
        category: 'reasoning',
        categoryName: '数学与逻辑轻量 MoE',
        description: 'Smaller Mixture of Experts (MoE) text-only LLM for efficient AI reasoning and math.',
        descriptionZh: 'OpenAI 开放权重的 20B 轻量级 MoE 纯文本大模型，专为高效数学解题、逻辑推理和低开销推理设计。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['reasoning', 'math', 'moe', 'open-weights'],
        endpointType: 'chat',
        contextWindow: '64K',
        bestFor: '小学到高中数学公式推导、算术题自动验算、轻量逻辑分析',
        badge: '📐 数学与逻辑'
    },
    {
        id: 'google/diffusiongemma-26b-a4b-it',
        name: 'DiffusionGemma 26B A4B IT',
        provider: 'Google',
        category: 'reasoning',
        categoryName: '扩散机制并行生成 LLM',
        description: 'Diffusion-based 26B parameter LLM enabling parallel token generation for real-time text apps.',
        descriptionZh: 'Google 创新扩散式 26B 参数大模型，支持并行 Token 生成，首字延迟与出字吞吐极高，适合实时高频打字体验。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['diffusion-llm', 'parallel-generation', 'real-time', 'text'],
        endpointType: 'chat',
        contextWindow: '32K',
        bestFor: '即时交互式互动游戏、超快出字教学展示、实时文字生成',
        badge: '⚡ 并行极速'
    },
    {
        id: 'z-ai/glm-5-3',
        name: 'GLM 5 3 (智谱/Zhipu)',
        provider: 'Z.ai',
        category: 'reasoning',
        categoryName: '超大稀疏文本 MoE (即将下线)',
        description: '753B-parameter text MoE with DeepSeek-style sparse attention, native FP8 weights, reasoning and tool calling.',
        descriptionZh: '智谱 753B 超大规模稀疏 MoE 纯文本模型，原生 FP8 精度。（注：平台标注 Deprecation in 8d，建议迁移至 GLM-5-3-Flash）。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['reasoning', 'moe', '753b', 'tool-calling'],
        endpointType: 'chat',
        contextWindow: '128K',
        bestFor: '高阶中文文案推演（即将下线，请优先使用 glm-5-3-flash）',
        badge: '⚠️ 即将下线'
    },
    {
        id: 'meta/llama-3.3-70b-instruct',
        name: 'Llama 3.3 70B Instruct',
        provider: 'Meta',
        category: 'reasoning',
        categoryName: '主流开源旗舰 70B 指令模型',
        description: 'Meta\'s industry-standard 70B instruction-tuned model, widely supported on NVIDIA NIM.',
        descriptionZh: 'Meta 全球公认标杆开源 70B 指令微调模型，泛化能力全面，代码与文本输出极其扎实稳定。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['instruct', 'coding', 'chat', 'standard'],
        endpointType: 'chat',
        contextWindow: '128K',
        bestFor: '稳定兜底、通用教学课件设计、高质量多轮会话',
        badge: '🛡️ 稳定标杆'
    },
    {
        id: 'deepseek-ai/deepseek-r1',
        name: 'DeepSeek R1',
        provider: 'DeepSeek AI',
        category: 'reasoning',
        categoryName: '强化学习深度思维链模型',
        description: 'DeepSeek\'s flagship open-weights reasoning model with full reasoning traces and test-time compute.',
        descriptionZh: '深度求索划时代的 R1 推理大模型，具备完整的显式思考链，擅长复杂数理竞赛题、算法推导及深度纠错。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['reasoning', 'math', 'chain-of-thought', 'coding'],
        endpointType: 'chat',
        contextWindow: '64K',
        bestFor: '奥数题目解构、高阶算法推导、疑难代码深度 Debug',
        badge: '🧠 深度思考链'
    },

    // ---------------- 3. Agent 智能体与代码工程 ----------------
    {
        id: 'nvidia/nemotron-3.5-lightning-30b-a3b',
        name: 'Nemotron 3.5 Lightning 30B (A3B)',
        provider: 'NVIDIA',
        category: 'agentic',
        categoryName: '极速闪电 Agent 专精模型',
        description: 'Fastest 30B A3B MoE model with leading domain accuracy for specialized agentic tasks.',
        descriptionZh: 'NVIDIA 30B A3B 闪电版 MoE，在特定智能体与工具调用任务上具备极高的准确率与极快的推理吞吐。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['customization', 'agentic', 'fast', 'moe'],
        endpointType: 'chat',
        contextWindow: '64K',
        bestFor: '自动化脚本执行、工具链调度编排、低延迟任务执行',
        badge: '⚡ 闪电Agent'
    },
    {
        id: 'poolside/laguna-xs-2.1',
        name: 'Laguna XS 2.1 (Poolside)',
        provider: 'Poolside',
        category: 'agentic',
        categoryName: '长程终端与代码工程模型',
        description: 'Efficient 33B MoE for local, long-horizon agentic coding and terminal tasks.',
        descriptionZh: 'Poolside 出品的 33B 智能体代码模型，专为长流程代码构建、终端环境交互及复杂工程任务设计。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['agentic ai', 'coding', 'terminal', 'software-engineering'],
        endpointType: 'chat',
        contextWindow: '64K',
        bestFor: '长线自动化测试、CLI 工具控制、工程化代码生成',
        badge: '💻 终端工程'
    },

    // ---------------- 4. 语言翻译与语音 ----------------
    {
        id: 'nvidia/riva-translate-4b-instruct-v2',
        name: 'Riva Translate 4B Instruct V2',
        provider: 'NVIDIA',
        category: 'translation',
        categoryName: '37种语言专业双向翻译',
        description: 'Translation model in 37 languages with few-shots example prompts capability.',
        descriptionZh: 'NVIDIA Riva 专用 4B 机器翻译模型，覆盖 37 种语言，支持少样本 (Few-shot) 术语提示与上下文润色。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['nvidia nim', 'translation', 'multilingual', 'riva'],
        endpointType: 'chat',
        contextWindow: '32K',
        bestFor: '马来文 / 华文 / 英文三语专业互译、生词表生成、教学教材本地化',
        badge: '🌐 三语专业互译'
    },
    {
        id: 'nvidia/nemotron-voicechat',
        name: 'Nemotron Voicechat',
        provider: 'NVIDIA',
        category: 'translation',
        categoryName: '拟真语音对话交互模型',
        description: 'Nemotron 3 Voicechat for natural, conversational voice AI interactions.',
        descriptionZh: 'NVIDIA Nemotron 语音对话专用模型，针对口语交流、短句对话与实时对答场景进行了特殊调优。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['english', 'voice', 'speech-chat'],
        endpointType: 'chat',
        contextWindow: '32K',
        bestFor: '英语口语陪练、语音助手交互、课堂听力对话模拟',
        badge: '🎙️ 语音伴读'
    },

    // ---------------- 5. 向量嵌入与语义检索 (RAG) ----------------
    {
        id: 'nvidia/nemotron-3-embed-1b',
        name: 'Nemotron 3 Embed 1B',
        provider: 'NVIDIA',
        category: 'embedding',
        categoryName: '1B 向量语义检索模型',
        description: '1B embedding model for semantic search, retrieval, and RAG applications.',
        descriptionZh: 'NVIDIA 1B 高精度向量嵌入模型，专为语义搜索、教案知识库检索 (RAG) 和向量相似度匹配打造。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['nemotron retriever', 'embedding', 'rag', 'semantic-search'],
        endpointType: 'embeddings',
        contextWindow: '8K',
        bestFor: '华小校本资源知识库检索、题库语义查重、智能备课参考匹配',
        badge: '🔍 向量嵌入'
    },

    // ---------------- 6. 内容安全与护栏 (Safety Guardrails) ----------------
    {
        id: 'nvidia/llama-3.1-nemotron-safety-guard-8b-v3',
        name: 'Llama 3.1 Nemotron Safety Guard 8B V3',
        provider: 'NVIDIA',
        category: 'safety',
        categoryName: '多语言教学内容安全护栏',
        description: 'Leading multilingual content safety model for enhancing the safety and moderation capabilities of LLMs.',
        descriptionZh: 'NVIDIA 行业领先的多语言内容安全防护模型，用于检测暴力、不适宜少儿、越狱攻击与敏感违规内容。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['content moderation', 'safety', 'guardrails', 'multilingual'],
        endpointType: 'chat',
        contextWindow: '32K',
        bestFor: '华小校园网络环境防护、学生输入安全初审、AI 生成结果合规审查',
        badge: '🛡️ 校园安全'
    },
    {
        id: 'meta/llama-guard-4-12b',
        name: 'Llama Guard 4 12B',
        provider: 'Meta',
        category: 'safety',
        categoryName: '多模态双向安全审核模型',
        description: 'Multi-modal model to classify safety for input prompts as well output responses.',
        descriptionZh: 'Meta 12B 多模态安全分类器，能够同时对用户输入的提示词及模型生成的图文回答进行双向违规过滤。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['llm multimodal safety', 'guardrail', 'safety'],
        endpointType: 'chat',
        contextWindow: '32K',
        bestFor: '多模态图片审核、双向提示词过滤、合规日志打标',
        badge: '🛡️ 双向合规'
    },
    {
        id: 'nvidia/nemotron-3.5-content-safety',
        name: 'Nemotron 3.5 Content Safety',
        provider: 'NVIDIA',
        category: 'safety',
        categoryName: '多语言违规毒性检测模型',
        description: 'Multilingual, multimodal model for detecting unsafe and toxic content.',
        descriptionZh: '多语言多模态毒性与不合规内容检测专用模型，提供细粒度的违规严重度分级。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['llm safety', 'toxicity', 'multimodal'],
        endpointType: 'chat',
        contextWindow: '32K',
        bestFor: '评论区留言过滤、敏感字句阻断、教育场景毒性检测',
        badge: '🛡️ 毒性过滤'
    },

    // ---------------- 7. 物理世界感知与生成 (Physical AI) ----------------
    {
        id: 'nvidia/cosmos3-nano',
        name: 'Cosmos 3 Nano',
        provider: 'NVIDIA',
        category: 'physical-ai',
        categoryName: '物理世界视界与动作生成',
        description: 'Generates images, videos and action predictions from text, visual inputs and spatial controls, with mandatory input screening and visual SynthID.',
        descriptionZh: 'NVIDIA Cosmos 3 Nano：结合空间控制输入与文本/视觉输入，生成符合物理定律的世界动作、图像与视频状态。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['physical-ai', 'autonomous vehicles', 'spatial-control', 'generation'],
        endpointType: 'specialized',
        contextWindow: '32K',
        bestFor: '物理世界动力学模拟、机器人行动预测、空间视觉研究',
        badge: '🌍 物理AI生成'
    },
    {
        id: 'nvidia/cosmos3-nano-reasoner',
        name: 'Cosmos 3 Nano Reasoner',
        provider: 'NVIDIA',
        category: 'physical-ai',
        categoryName: '空间与视频物理逻辑推理',
        description: 'Vision language model that excels in understanding the physical world using structured reasoning on videos or images.',
        descriptionZh: '专注物理世界因果推演的视觉语言模型，通过结构化逻辑解析视频中的物体运动轨迹与物理交互关系。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['video understanding', 'physical-reasoning', 'spatial'],
        endpointType: 'chat',
        contextWindow: '64K',
        bestFor: '中小学科学实验视频推导、三维空间几何实物解析、物理现象解释',
        badge: '🔬 物理推理'
    },
    {
        id: 'nvidia/cosmos-transfer2.5-2b',
        name: 'Cosmos Transfer 2.5 2B',
        provider: 'NVIDIA',
        category: 'physical-ai',
        categoryName: '真实环境物理视频仿真',
        description: 'Generates physics-aware video world states for physical AI development using text prompts and multiple spatial control inputs derived from real-world data.',
        descriptionZh: '基于现实世界数据的物理感知视频世界状态生成器，支持多路空间控制提示词驱动。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['synthetic data generation', 'physics-aware', 'video-world'],
        endpointType: 'specialized',
        contextWindow: '32K',
        bestFor: '合成物理动态教学素材、科学模拟实验视频生成',
        badge: '🎥 物理仿真'
    },

    // ---------------- 8. 计算机视觉与姿态 (Computer Vision) ----------------
    {
        id: 'nvidia/3d-body-pose',
        name: '3D Body Pose',
        provider: 'NVIDIA',
        category: 'vision',
        categoryName: '视频 3D 人体骨骼与姿态估计',
        description: 'Estimate 3D human body pose and skeleton from video input.',
        descriptionZh: 'NVIDIA 经典视觉微服务，从普通单目视频输入中精确估算人体 3D 骨骼关节与空间运动姿态。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['skeleton', 'pose-estimation', 'video-vision'],
        endpointType: 'specialized',
        contextWindow: 'N/A',
        bestFor: '体育课动作标准度打分、课间操骨骼检测、姿势体态智能识别',
        badge: '🏃 骨骼姿态'
    },
    {
        id: 'nvidia/active-speaker-detection',
        name: 'Active Speaker Detection',
        provider: 'NVIDIA',
        category: 'vision',
        categoryName: '视频活跃发言人检测与追踪',
        description: 'Detect and track speaker identities across video frames.',
        descriptionZh: '跨越视频时序多帧检测并跟踪正在讲话的人脸与身份，实现视音频联动的发言人定位。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['speaker-tracking', 'audio-visual', 'broadcast'],
        endpointType: 'specialized',
        contextWindow: 'N/A',
        bestFor: '课堂讨论自动聚焦、多学生分组汇报镜头自动定位、会议录像分析',
        badge: '🎯 视音追踪'
    },
    {
        id: 'nvidia/synthetic-video-detector',
        name: 'Synthetic Video Detector',
        provider: 'NVIDIA',
        category: 'vision',
        categoryName: 'AI 生成视频 / Deepfake 深度伪造检测',
        description: 'NVIDIA Synthetic Video Detector is an AI-powered micro-service for detecting AI-generated (synthetic) videos.',
        descriptionZh: 'NVIDIA AI 驱动的视频鉴伪微服务，高效鉴别视频是否由人工智能合成或伪造。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['deepfake-detection', 'synthetic-video', 'authenticity'],
        endpointType: 'specialized',
        contextWindow: 'N/A',
        bestFor: '校园网络安全教育、数字素养教学防伪、多媒体素材鉴真',
        badge: '🔍 视频鉴伪'
    },
    {
        id: 'nvidia/streampetr',
        name: 'StreamPETR',
        provider: 'NVIDIA',
        category: 'vision',
        categoryName: '时序时空 3D 目标检测模型',
        description: 'StreamPETR offers efficient 3D object detection for autonomous driving by propagating sparse object queries temporally.',
        descriptionZh: '基于时序稀疏查询传播的高效 3D 物体检测微服务，专为实时高动态环境下的空间目标识别设计。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['autonomous vehicles', '3d-detection', 'temporal'],
        endpointType: 'specialized',
        contextWindow: 'N/A',
        bestFor: '计算机视觉教学演示、时空时序深度学习教学案例',
        badge: '🚗 3D感知'
    },

    // ---------------- 9. 表格与关系数据 (Data & ML) ----------------
    {
        id: 'nvidia/kumo-tabular',
        name: 'Kumo Tabular',
        provider: 'NVIDIA',
        category: 'data-ml',
        categoryName: '结构化表格情境学习预测',
        description: 'A tabular in-context learning model for classification and regression over structured tables.',
        descriptionZh: '针对结构化 Excel/CSV 表格的情境学习大模型，无需传统模型重新训练即可完成分类与数值回归预测。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['tabular', 'classification', 'regression', 'prediction'],
        endpointType: 'specialized',
        contextWindow: '32K',
        bestFor: '学生期末成绩趋势预测、出勤与阅读习惯关联分析、教务数据速算',
        badge: '📊 表格预测'
    },
    {
        id: 'nvidia/kumo-relational',
        name: 'Kumo Relational',
        provider: 'NVIDIA',
        category: 'data-ml',
        categoryName: '多表关系型大模型预测',
        description: 'A relational foundation model for prediction over structured, multi-table data.',
        descriptionZh: '关系型数据库大基座模型，跨越多张关联数据库表挖掘深层关联并直接给出业务预测。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['relational', 'multi-table', 'prediction', 'database'],
        endpointType: 'specialized',
        contextWindow: '32K',
        bestFor: '学校教务多表数据综合分析、全校图书借阅与学业表现相关性研究',
        badge: '🗄️ 关系多表'
    },

    // ---------------- 10. 科学计算与量子 (Scientific) ----------------
    {
        id: 'nvidia/ising-calibration-1.5-31b',
        name: 'Ising Calibration 1.5 31B',
        provider: 'NVIDIA',
        category: 'scientific',
        categoryName: '量子计算校准多模态模型 (Gemma 4 31B 底座)',
        description: 'NVIDIA-Ising-Calibration-1.5 is a dense multimodal vision-language model built on Gemma 4 31B. It analyzes quantum computing calibration charts and telemetry.',
        descriptionZh: '基于 Google Gemma 4 31B 底座训练的稠密多模态视觉语言模型，专用于深度理解量子计算校准图谱与测绘图表。',
        isFreeEndpoint: true,
        isDownloadable: false,
        tags: ['quantum computing', 'scientific', 'calibration', 'gemma-4-base'],
        endpointType: 'chat',
        contextWindow: '64K',
        bestFor: '高阶科学图表辨析、物理与量子遥测图谱识别、科研教学示范',
        badge: '⚛️ 量子校准1.5'
    },
    {
        id: 'nvidia/ising-calibration-1-35b-a3b',
        name: 'Ising Calibration 1 35B (A3B)',
        provider: 'NVIDIA',
        category: 'scientific',
        categoryName: '量子计算测绘图表理解 VLM',
        description: 'Open VLM for quantum computer calibration chart understanding across a range of qubit modalities.',
        descriptionZh: '开源 35B A3B 架构视觉语言大模型，横跨多种量子比特物理形态进行校准曲线图跨模态理解。',
        isFreeEndpoint: true,
        isDownloadable: true,
        tags: ['quantum', 'vlm', 'scientific', 'charts'],
        endpointType: 'chat',
        contextWindow: '64K',
        bestFor: '学术论文折线图/测绘热力图多模态问答、物理学术报告解读',
        badge: '⚛️ 量子图表'
    }
];

/**
 * 文本对话与代码编写场景的【极速容灾轮询池】(Failover Priority Sequence)
 * 当主选模型遇到 429 配额限制或 5xx 临时故障时，依次无缝切换尝试
 */
const NIM_FAILOVER_CHAT_POOL = [
    {
        id: 'nvidia/nemotron-3-ultra-550b-a55b',
        name: 'Nemotron 3 Ultra 550B',
        tag: '实测主力 (550B 混合架构，1.4s 快速响应)',
        weight: 10
    },
    {
        id: 'stepfun-ai/step-5-preview',
        name: 'Step 5 Preview',
        tag: '实测高可用 (1M 超长上下文，1.7s 响应)',
        weight: 9
    },
    {
        id: 'nvidia/nemotron-3.5-lightning-30b-a3b',
        name: 'Nemotron 3.5 Lightning 30B',
        tag: '实测闪电 (30B A3B 极速，1.8s 响应)',
        weight: 8
    },
    {
        id: 'openai/gpt-oss-20b',
        name: 'GPT OSS 20B',
        tag: '实测高可用 (数学与逻辑 MoE，3.7s 响应)',
        weight: 7
    },
    {
        id: 'google/gemma-4-31b-it',
        name: 'Gemma 4 31B IT',
        tag: '代码推理旗舰 (Google 密集 31B)',
        weight: 6
    },
    {
        id: 'nvidia/riva-translate-4b-instruct-v2',
        name: 'Riva Translate 4B',
        tag: '实测极速翻译 (37语互译，0.5s 响应)',
        weight: 5
    },
    {
        id: 'meta/muse-glimmer-30b',
        name: 'Muse Glimmer 30B',
        tag: '多模态思考链 (Meta 30B)',
        weight: 4
    }
];

/**
 * 多模态（支持图片输入）精选推荐池
 */
const NIM_MULTIMODAL_POOL = [
    'nvidia/nemotron-3.5-super-vl-120b-a12b',
    'deepseek-ai/deepseek-v4.1-flash',
    'stepfun-ai/step-5-preview',
    'z-ai/glm-5-3-flash',
    'meta/muse-glimmer-30b',
    'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning',
    'nvidia/cosmos3-nano-reasoner',
    'nvidia/ising-calibration-1.5-31b'
];

/**
 * NVIDIA NIM 服务管理与调用辅助类
 */
class NIMService {
    constructor() {
        this.storageKey = 'nvidia_nim_api_key';
        this.fallbackStorageKey = 'ai_agent_api_key';
    }

    /**
     * 获取当前可用的 API Key
     */
    getApiKey() {
        if (typeof localStorage !== 'undefined') {
            const custom = localStorage.getItem(this.storageKey);
            if (custom && custom.trim()) return custom.trim();

            const agentKey = localStorage.getItem(this.fallbackStorageKey);
            if (agentKey && agentKey.trim() && agentKey.startsWith('nvapi-')) return agentKey.trim();
        }

        // Support process.env in Node environments
        if (typeof process !== 'undefined' && process.env && process.env.NVIDIA_API_KEY) {
            return process.env.NVIDIA_API_KEY.trim();
        }

        return NIM_DEFAULT_API_KEY;
    }

    /**
     * 保存用户自定义 API Key
     */
    setApiKey(key) {
        if (typeof localStorage !== 'undefined') {
            if (key && key.trim()) {
                localStorage.setItem(this.storageKey, key.trim());
            } else {
                localStorage.removeItem(this.storageKey);
            }
        }
    }

    /**
     * 获取全量模型池
     */
    getAllModels() {
        return NIM_MODEL_POOL;
    }

    /**
     * 按 ID 查找模型
     */
    getModelById(modelId) {
        return NIM_MODEL_POOL.find(m => m.id === modelId) || null;
    }

    /**
     * 按分类筛选模型
     */
    getModelsByCategory(category) {
        if (!category || category === 'all') return NIM_MODEL_POOL;
        return NIM_MODEL_POOL.filter(m => m.category === category);
    }

    /**
     * 获取所有支持普通文本 Chat 的模型
     */
    getChatModels() {
        return NIM_MODEL_POOL.filter(m => m.endpointType === 'chat');
    }

    /**
     * 获取所有支持图文视觉的多模态模型
     */
    getMultimodalModels() {
        return NIM_MODEL_POOL.filter(m => NIM_MULTIMODAL_POOL.includes(m.id));
    }

    /**
     * 获取故障转移备用池列表
     */
    getFailoverPool() {
        return NIM_FAILOVER_CHAT_POOL;
    }

    /**
     * 一键轻量测活：向指定模型发送微型 Ping 测试，返回延迟和状态
     */
    async testModelLatency(modelId) {
        const apiKey = this.getApiKey();
        const startTime = Date.now();

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 25000);

            const res = await fetch(`${NIM_API_BASE_URL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal,
                body: JSON.stringify({
                    model: modelId,
                    messages: [
                        { role: 'user', content: 'Reply with the word OK and nothing else.' }
                    ],
                    max_tokens: 10,
                    temperature: 0.1
                })
            });

            clearTimeout(timeoutId);
            const latencyMs = Date.now() - startTime;

            if (res.ok) {
                const data = await res.json();
                const reply = data.choices?.[0]?.message?.content?.trim() || 'OK';
                return { success: true, latencyMs, reply, status: res.status };
            } else {
                const errText = await res.text();
                return { success: false, latencyMs, error: errText, status: res.status };
            }
        } catch (err) {
            return {
                success: false,
                latencyMs: Date.now() - startTime,
                error: err.name === 'AbortError' ? '请求超时 (25s)' : err.message
            };
        }
    }

    /**
     * 智能容灾请求发送：优先调用 preferredModelId，如果失败则在 NIM_FAILOVER_CHAT_POOL 中依次降级重试
     * @param {Object} options 
     * @param {Array} options.messages 对话历史 [{role, content}]
     * @param {string} [options.preferredModelId] 优先指定模型
     * @param {number} [options.temperature] 采样温度
     * @param {number} [options.maxTokens] 最大生成 token
     * @param {boolean} [options.stream] 是否流式传输
     * @param {Function} [options.onModelSwitch] 模型切换时的回调 (通知 UI)
     */
    async callNIMWithFailover({
        messages,
        preferredModelId = 'google/gemma-4-31b-it',
        temperature = 0.3,
        maxTokens = 4000,
        stream = false,
        onModelSwitch = null
    }) {
        const apiKey = this.getApiKey();

        // 构造重试模型序列：preferredModelId 放在首位，后续接容灾池
        const candidateModels = [preferredModelId];
        for (const item of NIM_FAILOVER_CHAT_POOL) {
            if (!candidateModels.includes(item.id)) {
                candidateModels.push(item.id);
            }
        }

        let lastError = null;

        for (let i = 0; i < candidateModels.length; i++) {
            const currentModel = candidateModels[i];

            if (i > 0 && typeof onModelSwitch === 'function') {
                onModelSwitch({
                    attempt: i + 1,
                    previousModel: candidateModels[i - 1],
                    switchedTo: currentModel,
                    reason: lastError?.message || '主模型响应受限，自动触发平滑降级'
                });
            }

            try {
                const response = await fetch(`${NIM_API_BASE_URL}/chat/completions`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: currentModel,
                        messages: messages,
                        temperature: temperature,
                        max_tokens: maxTokens,
                        stream: stream
                    })
                });

                if (response.ok) {
                    return {
                        success: true,
                        modelUsed: currentModel,
                        response: response
                    };
                }

                // 错误处理：429 配额或 5xx 内部错误，触发切换
                const errorBody = await response.text();
                lastError = new Error(`Model [${currentModel}] returned HTTP ${response.status}: ${errorBody}`);
                console.warn(`[NIM Failover] ${lastError.message}`);

            } catch (err) {
                lastError = err;
                console.warn(`[NIM Failover] Network error on model [${currentModel}]:`, err);
            }
        }

        // 所有模型均尝试失败
        throw new Error(`NIM 容灾池所有模型均调用失败，最终报错：${lastError?.message || '未知错误'}`);
    }
}

// 挂载全局单例，便于在纯 HTML 前端中直接免导入调用
if (typeof window !== 'undefined') {
    window.NIM_DEFAULT_API_KEY = NIM_DEFAULT_API_KEY;
    window.NIM_API_BASE_URL = NIM_API_BASE_URL;
    window.NIM_CATEGORIES = NIM_CATEGORIES;
    window.NIM_MODEL_POOL = NIM_MODEL_POOL;
    window.NIM_FAILOVER_CHAT_POOL = NIM_FAILOVER_CHAT_POOL;
    window.NIM_MULTIMODAL_POOL = NIM_MULTIMODAL_POOL;
    window.nimService = new NIMService();
    window.NIMService = NIMService;

    // 默认写入 localStorage，确保网页和所有工具默认立即可用
    try {
        if (typeof localStorage !== 'undefined' && !localStorage.getItem('nvidia_nim_api_key')) {
            localStorage.setItem('nvidia_nim_api_key', NIM_DEFAULT_API_KEY);
        }
    } catch (e) {
        console.warn('无法持久化默认 NIM API Key 至 localStorage', e);
    }
}

// 兼容 Node.js / ES 模块环境
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NIM_DEFAULT_API_KEY,
        NIM_API_BASE_URL,
        NIM_CATEGORIES,
        NIM_MODEL_POOL,
        NIM_FAILOVER_CHAT_POOL,
        NIM_MULTIMODAL_POOL,
        NIMService
    };
}
