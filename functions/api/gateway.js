export async function onRequest(context) {
    const { request, env } = context;
    
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    try {
        const body = await request.json();
        const model = body.model || "";

        let apiUrl = "";
        let apiKey = "";

        // Smart routing based on model name and request type
        if (body.type === "image" || model.includes("stabilityai") || model.includes("stable-diffusion")) {
            apiUrl = "https://integrate.api.nvidia.com/v1/images/generations";
            apiKey = env.NVIDIA_API_KEY;
            // Clean up custom fields before sending to upstream
            if (body.type) delete body.type;
        } else if (model.startsWith("gemini-")) {
            apiUrl = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
            apiKey = env.GEMINI_API_KEY;
        } else {
            apiUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
            apiKey = env.NVIDIA_API_KEY;
        }

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API Key not configured in environment variables for this provider." }), { 
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
        }

        // Forward the exact same JSON body to the chosen provider
        const upstreamResponse = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await upstreamResponse.text();

        return new Response(data, {
            status: upstreamResponse.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { 
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}
