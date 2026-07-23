export async function onRequestGet(context) {
    try {
        const { env } = context;
        
        // PROJECTS_KV 是 Cloudflare KV 的绑定名称
        if (!env.PROJECTS_KV) {
            // 提供测试时的假数据，以便用户在本地没有配置 KV 时也能预览
            return new Response(JSON.stringify({
                projects: [
                    {
                        id: "demo-1",
                        title: "算数消消乐",
                        author: "王老师",
                        createdAt: Date.now() - 86400000,
                        code: "<h1>这是一个示例游戏</h1>"
                    }
                ]
            }), { headers: { "Content-Type": "application/json" } });
        }

        const { keys } = await env.PROJECTS_KV.list({ prefix: "project:" });
        const projects = [];

        for (const key of keys) {
            const value = await env.PROJECTS_KV.get(key.name, { type: "json" });
            if (value) {
                projects.push(value);
            }
        }

        // 按照创建时间倒序排列
        projects.sort((a, b) => b.createdAt - a.createdAt);

        return new Response(JSON.stringify({ projects }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
        const body = await request.json();
        const { title, author, email, code } = body;

        if (!title || !author || !code) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        const id = "project:" + Date.now() + "-" + Math.random().toString(36).substring(2, 9);
        const projectData = {
            id,
            title,
            author,
            email, // 真实环境中应考虑是否保存在单独的私密KV里，这里简化存储
            code,
            createdAt: Date.now()
        };

        if (env.PROJECTS_KV) {
            await env.PROJECTS_KV.put(id, JSON.stringify(projectData));
        }

        return new Response(JSON.stringify({ success: true, id }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
