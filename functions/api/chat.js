export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
        // 从请求中获取对话历史
        const body = await request.json();
        const { messages } = body; // [{role: 'user', content: '...'}, {role: 'assistant', content: '...'}]

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
        }

        const systemPrompt = `你是一个资深前端开发工程师和交互设计师。你的任务是根据用户的需求，生成一段完整的、可以直接运行的单文件 HTML 代码（包含所有的 CSS 和 JS）。
规则：
1. 必须使用单文件 HTML，不要外部引用任何本地不存在的 CSS/JS 文件。
2. 界面设计要求现代化、美观，可以多使用渐变色、阴影、圆角和简单的微动画，打造一种活泼有趣的体验。
3. 你的输出只能是 HTML 代码本身，禁止输出任何其他的 markdown 语法或多余的解释性文字，也不要使用 \`\`\`html 这样的代码块包裹，只输出纯粹的 HTML 文本。
4. 如果用户在后续对话中提出修改意见，你需要基于之前的设计重新输出完整的 HTML 页面，不要只输出修改的部分。
5. 必须支持响应式设计，适配手机版和电脑版。`;

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
                model: "meta/llama-3.1-70b-instruct",
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
