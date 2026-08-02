export async function onRequest(context) {
    const { request, env } = context;
    const db = env.DB; // Expected D1 binding

    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    if (!db) {
        return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not found." }), { status: 500, headers: corsHeaders });
    }

    try {
        // Auto-create table
        await db.prepare(`
            CREATE TABLE IF NOT EXISTS cloze_games (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                topic TEXT,
                sentence TEXT,
                blanks TEXT,
                image_b64 TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        if (request.method === "POST") {
            const data = await request.json();
            const { topic, sentence, blanks, image_b64 } = data;
            
            if (!sentence || !blanks) {
                return new Response(JSON.stringify({ error: "Missing required fields." }), { status: 400, headers: corsHeaders });
            }

            const result = await db.prepare(
                `INSERT INTO cloze_games (topic, sentence, blanks, image_b64) VALUES (?, ?, ?, ?)`
            ).bind(topic || "", sentence, JSON.stringify(blanks), image_b64 || "").run();
            
            return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), { headers: corsHeaders });
        } else if (request.method === "GET") {
            // Get random game
            const result = await db.prepare(`SELECT * FROM cloze_games ORDER BY RANDOM() LIMIT 1`).all();
            if (!result.results || result.results.length === 0) {
                return new Response(JSON.stringify({ error: "No games found in database." }), { status: 404, headers: corsHeaders });
            }
            return new Response(JSON.stringify(result.results[0]), { headers: corsHeaders });
        } else {
            return new Response("Method not allowed", { status: 405, headers: corsHeaders });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
    }
}
