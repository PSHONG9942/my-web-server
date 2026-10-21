/**
 * Gemini Multi-Model Pool & Educational Image Generation Service
 * 专为华小数字化教具设计的 Google Gemini 多模型轮询与容灾生图引擎
 */

const DEFAULT_API_KEY = 'AQ.Ab8RN6K4d7YaXGmrGXmfCmtQEkZYQnuO-bJVRZYf2W5sDkZUGA';

// 多模型负载均衡池 (总配额超过 1060 RPD)
const GEMINI_MODEL_POOL = [
    { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash Lite', rpd: 500, rpm: 15, tag: '极速主力 (500次/天)' },
    { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash Lite', rpd: 500, rpm: 15, tag: '备用主力 (500次/天)' },
    { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash', rpd: 20, rpm: 5, tag: '高质量推演 (20次/天)' },
    { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', rpd: 20, rpm: 5, tag: '顶级新模型 (20次/天)' },
    { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash Preview', rpd: 20, rpm: 5, tag: '前沿预览 (20次/天)' }
];

// 预设教育插画风格
const ILLUSTRATION_STYLES = {
    textbook: {
        id: 'textbook',
        name: '📚 华小课本绘本风',
        badge: '最推荐',
        promptSuffix: 'charming children storybook illustration style, primary school textbook clipart, cute friendly Asian characters, vibrant and warm pastel colors, clean crisp outlines, gentle lighting, white minimalist background, soft aesthetic, high quality illustration'
    },
    coloring: {
        id: 'coloring',
        name: '🖍️ 黑白线描 / 涂色卡风',
        badge: '学生涂色',
        promptSuffix: 'black and white coloring book page style for children, clean bold line art, no shading, no gradient, pure white background, easy to color, cute cartoon characters, educational coloring sheet outline, clear minimalist strokes'
    },
    watercolor: {
        id: 'watercolor',
        name: '🎨 治愈水彩手绘风',
        badge: '童趣唯美',
        promptSuffix: 'whimsical watercolor illustration for children, soft pastel watercolor splashes, gentle textures, warm and uplifting mood, storybook art, bright clean background, artistic hand-painted feel'
    },
    clay3d: {
        id: 'clay3d',
        name: '🧸 3D 萌系黏土风',
        badge: '生动立体',
        promptSuffix: 'cute 3D claymation plasticine style, blind box toy aesthetic, smooth clay texture, round cute proportions, bright studio lighting, soft shadows, clean solid white background, 4k render'
    },
    flatVector: {
        id: 'flatVector',
        name: '🌟 极简扁平矢量风',
        badge: '清爽现代',
        promptSuffix: 'modern flat vector illustration, simple geometric shapes, clean vibrant palette, educational infographic style, no clutter, minimalist white background'
    }
};

class GeminiImageService {
    constructor() {
        this.storageKey = 'google_gemini_api_key';
        this.activeModelIndex = 0;
        this.callStats = {
            totalSuccess: 0,
            failoverCount: 0,
            lastUsedModel: null
        };
    }

    getApiKey() {
        const stored = localStorage.getItem(this.storageKey);
        return (stored && stored.trim()) ? stored.trim() : DEFAULT_API_KEY;
    }

    setApiKey(key) {
        if (key && key.trim()) {
            localStorage.setItem(this.storageKey, key.trim());
        } else {
            localStorage.removeItem(this.storageKey);
        }
    }

    resetApiKey() {
        localStorage.removeItem(this.storageKey);
    }

    getModelPool() {
        return GEMINI_MODEL_POOL;
    }

    getIllustrationStyles() {
        return ILLUSTRATION_STYLES;
    }

    /**
     * 调用 Gemini 语言模型，带自动故障转移/降级池 (Failover Pool)
     * 若遇到 429 配额耗尽或网络错误，自动切换至下一个模型重试
     */
    async callGeminiWithFailover(systemPrompt, userText, onModelSwitch = null) {
        const apiKey = this.getApiKey();
        let lastError = null;
        const poolLength = GEMINI_MODEL_POOL.length;

        for (let attempt = 0; attempt < poolLength; attempt++) {
            // 当前尝试的模型索引
            const currentIndex = (this.activeModelIndex + attempt) % poolLength;
            const model = GEMINI_MODEL_POOL[currentIndex];

            if (onModelSwitch && attempt > 0) {
                onModelSwitch({
                    attempt: attempt + 1,
                    switchedTo: model,
                    reason: lastError?.message || '配额耗尽，自动降级切换'
                });
            }

            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 12000); // 12秒超时

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model.id}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    signal: controller.signal,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: 'user',
                                parts: [{ text: `${systemPrompt}\n\n【用户输入/句子】：\n"${userText}"` }]
                            }
                        ],
                        generationConfig: {
                            temperature: 0.65,
                            maxOutputTokens: 350
                        }
                    })
                });

                clearTimeout(timeoutId);

                // 处理 429 (Rate Limit / Quota Exceeded)
                if (response.status === 429) {
                    console.warn(`[Gemini Pool] 模型 ${model.name} 返回 429 配额用尽，立即自动切换到备用模型...`);
                    this.callStats.failoverCount++;
                    lastError = new Error(`模型 ${model.name} 今日 20/500 RPD 配额已满 (429)`);
                    continue; // 尝试下一个模型
                }

                const data = await response.json();

                if (response.status === 200 && data.candidates?.[0]?.content?.parts?.[0]?.text) {
                    const text = data.candidates[0].content.parts[0].text.trim();
                    this.activeModelIndex = currentIndex; // 记住当前健康的模型
                    this.callStats.totalSuccess++;
                    this.callStats.lastUsedModel = model.name;
                    return {
                        success: true,
                        text: text,
                        model: model,
                        attemptsNeeded: attempt + 1
                    };
                }

                if (data.error) {
                    console.warn(`[Gemini Pool] 模型 ${model.name} 返回错误:`, data.error);
                    lastError = new Error(data.error.message || `API Error ${response.status}`);
                    // 如果是不可用/弃用，继续切换
                    continue;
                }

            } catch (err) {
                console.warn(`[Gemini Pool] 模型 ${model.name} 网络或超时异常:`, err.message);
                lastError = err;
                continue;
            }
        }

        throw new Error(lastError ? `所有 Gemini 模型池均无法响应: ${lastError.message}` : '多模型重试全部失败');
    }

    /**
     * 将中文句子通过 Gemini 扩写并艺术提炼为针对儿童教具生动的英文生图提示词
     */
    async refinePromptForIllustration(chineseSentence, styleKey = 'textbook', onProgress = null) {
        const style = ILLUSTRATION_STYLES[styleKey] || ILLUSTRATION_STYLES.textbook;

        const systemPrompt = `You are a professional educational illustrator and art director for primary school Chinese textbooks (马来西亚华小华文教材插画师).
Your mission is to convert a Chinese sentence or topic into an exquisite, kid-friendly English image prompt for generating textbook illustrations.

Strict Requirements:
1. Audience: Primary school students (Ages 6-12).
2. Content: Analyze the main subject, actions, emotions, and cheerful setting from the input sentence.
3. Clean Composition: Focus on the key actions with a clean, uncluttered background suitable for worksheets.
4. Integrate Style: Seamlessly incorporate the following artistic style keywords: "${style.promptSuffix}".
5. Important: Output ONLY the plain English prompt text without quotes, formatting, or explanations.`;

        const result = await this.callGeminiWithFailover(systemPrompt, chineseSentence, onProgress);
        return {
            visualPrompt: result.text,
            usedModel: result.model,
            attemptsNeeded: result.attemptsNeeded
        };
    }

    /**
     * 核心生图函数：将提示词渲染为高分辨率图片
     * 优先转换为 Base64 DataURL，若遇到网络安全限制则自动无缝降级为直接图片 URL，保证 100% 成功出图
     */
    async renderImage(visualPrompt, options = {}) {
        const {
            width = 600,
            height = 600,
            seed = Math.floor(Math.random() * 10000000),
            onStatus = null
        } = options;

        if (onStatus) onStatus('正在调用超清绘画引擎绘制教学插图...');

        // 整理提示词，去除特殊换行符并控制安全长度
        const cleanPrompt = visualPrompt.replace(/[\r\n\t"']/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 280);
        const encodedPrompt = encodeURIComponent(cleanPrompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

        // 优先使用 fetch 转换为 Base64，确保打印和 PDF 导出无任何跨域限制
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 20000); // 20秒超时

            const res = await fetch(imageUrl, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (res.ok) {
                const blob = await res.blob();
                const dataUrl = await new Promise((resolve) => {
                    if (typeof FileReader !== 'undefined') {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = () => resolve(imageUrl);
                        reader.readAsDataURL(blob);
                    } else {
                        resolve(imageUrl);
                    }
                });

                return {
                    dataUrl,
                    blob,
                    seed,
                    visualPrompt: cleanPrompt,
                    width,
                    height
                };
            }
        } catch (fetchErr) {
            console.warn('[Gemini Service] fetch 转换受阻，自动无缝回退至直接图片 URL:', fetchErr.message);
        }

        // 回退方案：直接使用超清图片 URL (保证 <img> 标签 100% 顺畅加载)
        return {
            dataUrl: imageUrl,
            seed,
            visualPrompt: cleanPrompt,
            width,
            height
        };
    }

    /**
     * 一键端到端流程：输入句子 -> Gemini视觉导演扩写 -> 高清渲染出图
     */
    async generateIllustrationFromSentence(chineseSentence, styleKey = 'textbook', options = {}) {
        const { onStatus = null, onModelSwitch = null, width = 600, height = 600 } = options;

        if (onStatus) onStatus('Gemini 智能视觉导演正在解析生字语义与画面...');

        // 第 1 步：Gemini 多模型池提示词提炼
        const { visualPrompt, usedModel, attemptsNeeded } = await this.refinePromptForIllustration(
            chineseSentence,
            styleKey,
            onModelSwitch
        );

        if (onStatus) onStatus(`[${usedModel.name}] 灵感已就绪，正在渲染教学插画...`);

        // 第 2 步：渲染插图
        const renderResult = await this.renderImage(visualPrompt, {
            width,
            height,
            onStatus
        });

        return {
            ...renderResult,
            usedModel,
            attemptsNeeded,
            originalSentence: chineseSentence,
            styleKey
        };
    }

    /**
     * Agent 1: 极速出题创意智能体 (Fast Prompt Creator Agent)
     * 利用 Gemini 3.5 Flash Lite 极速（<1秒）生成简单、生动、符合华小学生水平的造句例句
     */
    async generateSentenceIdea(topicKeyword = '', onStatus = null) {
        if (onStatus) onStatus('Agent 1 (极速创意助手) 正在构思生动造句题目...');

        const systemPrompt = `You are a creative primary school Chinese teacher (马来西亚华小华文优秀教师).
Generate ONE simple, vivid, age-appropriate sentence (8 to 22 Chinese characters) suitable for primary school students (Ages 7-10).
The sentence must describe a concrete visual scene (people/animals doing an action in a setting), which can easily be drawn as a storybook illustration.

Rules:
1. Lively, positive, and educational.
2. Natural grammar, standard Chinese vocabulary (符合KSSR标准华文).
3. Output ONLY the single Chinese sentence. No pinyin, no explanations, no quotes, no numbering.`;

        const userPrompt = topicKeyword && topicKeyword.trim() 
            ? `请围绕主题【${topicKeyword.trim()}】生成一个适合小学生看图造句的简单生动句子。`
            : `请随机生成一个适合华小学生看图造句的趣味日常、动物或校园情境句子。`;

        const result = await this.callGeminiWithFailover(systemPrompt, userPrompt);
        return {
            sentence: result.text.replace(/["'“”]/g, '').trim(),
            model: result.model
        };
    }

    /**
     * Agent 4: 评估主考官与评分细则智能体 (Moderator & Rubric Agent)
     * 建立统一、客观、有针对性的华小学生看图造句评价标准 (Rubric)
     */
    async generateModeratorRubric(sentence, visualPrompt = '') {
        const systemPrompt = `You are an educational assessment moderator for primary school Chinese language (华小华文评阅组长/主考官).
Based on the teaching sentence and illustration scene, define a clear 5-point evaluation rubric and key visual observation checkpoints for students.

Return strict JSON format:
{
  "keyVisualElements": ["核心景物/人物", "关键动作", "环境/氛围"],
  "rubricItems": [
    { "name": "画面契合度", "weight": "30%", "desc": "能否准确观察并写出插图中的核心人物、动物或情境" },
    { "name": "语法完整度", "weight": "30%", "desc": "主谓宾搭配是否完整，标点符号使用是否规范" },
    { "name": "词汇生动度", "weight": "25%", "desc": "是否使用准确的动词、生动的形容词或修辞" },
    { "name": "逻辑通顺度", "weight": "15%", "desc": "语句是否自然连贯，前后文逻辑合理" }
  ],
  "teacherAdvice": "给学生的温馨审题建议"
}`;

        try {
            const userPrompt = `参考题目：“${sentence}”。画面提示词：“${visualPrompt}”。请生成本题专属的看图造句评分细则。`;
            const result = await this.callGeminiWithFailover(systemPrompt, userPrompt);
            const cleanJson = result.text.replace(/```(?:json)?\s*([\s\S]*?)```/i, '$1').trim();
            return JSON.parse(cleanJson);
        } catch (e) {
            console.warn('[Moderator Agent] Fallback to default rubric:', e);
            return {
                keyVisualElements: ["画面主要人物/主体", "正在做的事情", "时间与场景"],
                rubricItems: [
                    { name: "画面契合度", weight: "30%", desc: "是否紧扣插图情境与主题" },
                    { name: "语法完整度", weight: "30%", desc: "句子通顺完整，标点符号正确" },
                    { name: "词汇生动度", weight: "25%", desc: "善用修饰词与生动动词" },
                    { name: "逻辑通顺度", weight: "15%", desc: "表意清晰，符合常理" }
                ],
                teacherAdvice: "仔细观察画中人物的动作和表情，试着用‘谁在什么地方做什么’写一句完整的话。"
            };
        }
    }

    /**
     * Agent 3: 视觉多模态审图与造句批改评估智能体 (Vision & Evaluator Agent)
     * 多模态直接审阅学生上传/生成的图片，比对学生句子并依照 Moderator Rubric 进行 5 分制评价
     */
    async evaluateStudentSentenceWithVision(params) {
        const {
            imageDataUrl,
            studentSentence,
            topicSentence = '',
            rubric = null,
            onStatus = null,
            onModelSwitch = null
        } = params;

        if (onStatus) onStatus('Agent 3 (AI 视觉审阅官) 正在细心观察图片并批阅您的造句...');

        const apiKey = this.getApiKey();

        // 提取图片 Base64 数据
        let inlineData = null;
        if (imageDataUrl && imageDataUrl.startsWith('data:')) {
            const matches = imageDataUrl.match(/^data:([^;]+);base64,(.+)$/);
            if (matches) {
                inlineData = {
                    mimeType: matches[1],
                    data: matches[2]
                };
            }
        }

        // 如果是远程 HTTP URL，尝试在浏览器中拉取 blob 转换为 base64
        if (!inlineData && imageDataUrl && imageDataUrl.startsWith('http')) {
            try {
                const res = await fetch(imageDataUrl);
                if (res.ok) {
                    const blob = await res.blob();
                    const b64 = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            const result = reader.result;
                            const m = result.match(/^data:([^;]+);base64,(.+)$/);
                            if (m) resolve({ mimeType: m[1], data: m[2] });
                            else resolve(null);
                        };
                        reader.onerror = () => resolve(null);
                        reader.readAsDataURL(blob);
                    });
                    if (b64) inlineData = b64;
                }
            } catch (err) {
                console.warn('Could not convert remote image to inlineData:', err);
            }
        }

        const systemPrompt = `You are an expert, encouraging, warm primary school Chinese master teacher (马来西亚华小特级华文名师).
You are evaluating a primary school student's sentence written based on the provided picture and lesson theme.

Grading Standards (5-Star Scale, 1.0 to 5.0):
- 画面契合度 (Does the sentence accurately describe the visual details in the picture?)
- 语法完整度 (Is grammar correct with complete subject, predicate, object, and standard punctuation?)
- 词汇生动度 (Are vivid verbs, sensory adjectives, or rhetorical devices used?)
- 逻辑通顺度 (Is the logic clear and reasonable?)

IMPORTANT INSTRUCTIONS:
1. Carefully inspect the image details: characters, actions, facial expressions, background objects, colors.
2. Check if student sentence matches the real picture. If student hallucinates things not in the picture, note it gently.
3. Tone: Warm, highly encouraging, kid-friendly (like a kind teacher speaking to a child).
4. Provide constructive corrections and an improved upgraded sentence (升格范句).

Return STRICT JSON ONLY:
{
  "score": 4.5,
  "stars": 4.5,
  "level": "优秀 / 良好 / 达标 / 需努力",
  "praise": "【老师夸夸】挖掘闪光点，夸赞孩子的用词和创意...",
  "critique": "【啄木鸟找茬】温和指出错别字、标点错误、语病或与画面不符之处...",
  "suggestion": "【点金小妙招】具体指导如何把句子写得更生动入木三分...",
  "improvedSentence": "升格后充满文采的参考范例句子",
  "dimensions": {
    "imageMatch": "5/5",
    "grammar": "4.5/5",
    "vocabulary": "4.5/5",
    "logic": "5/5"
  }
}`;

        const promptText = `
【题目情境/例句】：${topicSentence || '看图造句'}
【评分标准细则】：${JSON.stringify(rubric || {})}
【学生的造句内容】：
"${studentSentence}"

请依据上面的图片视觉细节与评价准则，给出专业的 5 分制量规批阅分析（以纯 JSON 格式输出）。`;

        // 优先使用高智能视觉模型池
        const visionModels = [
            { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash Lite' },
            { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash Lite' },
            { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash' },
            { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash' }
        ];

        let lastErr = null;
        for (let i = 0; i < visionModels.length; i++) {
            const m = visionModels[i];
            try {
                if (onModelSwitch && i > 0) {
                    onModelSwitch({ attempt: i + 1, switchedTo: m });
                }

                const parts = [];
                if (inlineData) {
                    parts.push({ inlineData: inlineData });
                }
                parts.push({ text: `${systemPrompt}\n\n${promptText}` });

                const controller = new AbortController();
                const t = setTimeout(() => controller.abort(), 15000);

                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m.id}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    signal: controller.signal,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ role: 'user', parts: parts }],
                        generationConfig: {
                            temperature: 0.6,
                            responseMimeType: "application/json"
                        }
                    })
                });
                clearTimeout(t);

                if (res.status === 429) {
                    console.warn(`[Vision Evaluator] ${m.name} 429 配额用尽，顺延至下一模型...`);
                    continue;
                }

                const data = await res.json();
                if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
                    const rawJson = data.candidates[0].content.parts[0].text.trim();
                    const cleanJson = rawJson.replace(/```(?:json)?\s*([\s\S]*?)```/i, '$1').trim();
                    const parsed = JSON.parse(cleanJson);
                    return {
                        success: true,
                        evaluation: parsed,
                        model: m.name
                    };
                }
            } catch (err) {
                console.warn(`[Vision Evaluator] ${m.name} 异常:`, err.message);
                lastErr = err;
            }
        }

        throw new Error(lastErr ? `AI 批改服务未响应: ${lastErr.message}` : 'AI 批阅超时，请重试');
    }

    /**
     * 诊断测试所有模型的健康度与延迟
     */
    async testAllModelsHealth() {
        const apiKey = this.getApiKey();
        const results = [];

        for (const model of GEMINI_MODEL_POOL) {
            const start = Date.now();
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 6000);

                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model.id}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    signal: controller.signal,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: "hi" }] }]
                    })
                });
                clearTimeout(timeoutId);
                const latency = Date.now() - start;

                if (res.status === 200) {
                    results.push({ ...model, status: 'healthy', latency, message: '正常在线 (200 OK)' });
                } else if (res.status === 429) {
                    results.push({ ...model, status: 'exhausted', latency, message: '配额耗尽 (429 Rate Limit)' });
                } else {
                    results.push({ ...model, status: 'error', latency, message: `异常 (${res.status})` });
                }
            } catch (e) {
                results.push({ ...model, status: 'timeout', latency: Date.now() - start, message: e.name === 'AbortError' ? '超时' : e.message });
            }
        }
        return results;
    }
}

// 导出单例到全局
window.geminiImageService = new GeminiImageService();
