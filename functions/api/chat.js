export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
        // 从请求中获取对话历史
        const body = await request.json();
        const { messages, model } = body; // [{role: 'user', content: '...'}, {role: 'assistant', content: '...'}]

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
        }

        const systemPrompt = `你是一个拥有顶级审美和开发经验的资深前端架构师。你的任务是根据用户的需求，生成一段完整的、无需任何外部依赖（CDN除外）的单文件 HTML 代码（包含 CSS 和 JS）。
规则：
1. 你的设计必须非常具有高级感，摒弃单调的界面，必须强制使用以下元素：毛玻璃效果 (Glassmorphism)、平滑的色彩渐变 (Vibrant Gradients)、柔和的阴影 (Soft UI)、微动画 (Micro-interactions) 和圆角设计。
2. 推荐通过 CDN 引入 Tailwind CSS 或 Google Fonts (如 Inter 或 Orbitron 字体) 来提升排版美感，图标可以使用 FontAwesome。
3. 你的输出只能是 HTML 代码本身，绝对不能输出任何 markdown 语法、\`\`\`html 代码块包裹或解释性文字。
4. 如果用户提出修改，请基于原设计迭代并输出完整的 HTML 页面代码。
5. 必须支持响应式设计，适配手机版和电脑版，确保交互流畅不卡顿。`;

        // 构造完整的请求体
        const apiMessages = [
            { role: "system", content: systemPrompt },
            ...messages
        ];

        // 获取环境变量中的 API KEY
        // 在 Cloudflare Pages 中，环境变量需要配置为 NVIDIA_API_KEY
        const apiKey = env.NVIDIA_API_KEY || "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"; 

        const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: model || "meta/llama-3.3-70b-instruct",
                messages: apiMessages,
                temperature: 0.2,
                top_p: 0.7,
                max_tokens: 4000,
                stream: true // 开启流式输出，防止长对话导致的 524 Timeout
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`NVIDIA API Error: ${response.status} - ${errorText}`);
        }

        // 直接将流转发给前端
        return new Response(response.body, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
