/**
 * Cloudflare Worker: Diary Buddy Backend (worker.js)
 * 
 * Handles rate-limiting via Cloudflare KV, secures Gemini API access,
 * and calls the gemini-3.1-flash-lite model to restructure students' diaries.
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Expose-Headers": "X-Class-Requests-Left, X-Class-Reset-Seconds"
};

export default {
  async fetch(request, env, ctx) {
    // 1. Handle CORS Preflight (OPTIONS request)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS
      });
    }

    // 2. Validate Endpoint (strictly POST /api/restructure)
    const url = new URL(request.url);
    if (url.pathname !== "/api/restructure" || request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Endpoint not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          ...CORS_HEADERS
        }
      });
    }

    // 3. Track Rate Limiting via KV Namespace (DIARY_LIMITS)
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hour = String(now.getUTCHours()).padStart(2, '0');
    const minute = String(now.getUTCMinutes()).padStart(2, '0');
    
    // Create an isolated key for the current UTC minute
    const kvKey = `minute_${year}_${month}_${day}_${hour}_${minute}`;
    const resetSeconds = 60 - now.getUTCSeconds();

    let count = 0;
    const kvAvailable = !!env.DIARY_LIMITS;

    if (kvAvailable) {
      try {
        const storedCount = await env.DIARY_LIMITS.get(kvKey);
        if (storedCount !== null) {
          count = parseInt(storedCount, 10);
        }
      } catch (err) {
        console.error("KV read error:", err);
      }
    } else {
      console.warn("DIARY_LIMITS KV namespace is not bound. Rate limiting is disabled.");
    }

    const maxRequestsPerMinute = 15;
    
    // Check if the rate limit is exceeded
    if (count >= maxRequestsPerMinute) {
      const responseHeaders = {
        "Content-Type": "application/json",
        "X-Class-Requests-Left": "0",
        "X-Class-Reset-Seconds": String(resetSeconds),
        ...CORS_HEADERS
      };

      return new Response(
        JSON.stringify({
          error: "Classroom rate limit exceeded! ⏳",
          message: "Wow, so many students are writing diaries right now! Please wait a moment for the magic queue to open up. ✨"
        }),
        {
          status: 429,
          headers: responseHeaders
        }
      );
    }

    // Increment request count in KV
    let newCount = count + 1;
    if (kvAvailable) {
      try {
        await env.DIARY_LIMITS.put(kvKey, String(newCount), { expirationTtl: 120 });
      } catch (err) {
        console.error("KV write error:", err);
      }
    }

    const requestsLeft = Math.max(0, maxRequestsPerMinute - newCount);
    const trackingHeaders = {
      "X-Class-Requests-Left": String(requestsLeft),
      "X-Class-Reset-Seconds": String(resetSeconds),
      ...CORS_HEADERS
    };

    // 4. Parse request body
    let payload;
    try {
      payload = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON input" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...trackingHeaders
        }
      });
    }

    const { studentInput, language } = payload;
    if (!studentInput || studentInput.trim() === "") {
      return new Response(JSON.stringify({ error: "Student input diary cannot be empty" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...trackingHeaders
        }
      });
    }

    // 5. Connect to the Gemini API (using gemini-3.1-flash-lite)
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Backend API key configuration missing" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...trackingHeaders
        }
      });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`;

    const systemPrompt = `You are a warm, extremely friendly, and supportive AI English teaching buddy ("Diary Buddy").
The user is a 10-year-old Year 4 primary school student writing a diary entry during school holidays.
They can write in English, Chinese (华语), Malay (Bahasa Melayu), or a chaotic mix of words and emojis (e.g. 'I went to 🏊 with my 🧑🤝🧑').

Your task:
1. Carefully decode their mixed emojis, Chinese, and Malay words, mapping them to their correct English meanings.
2. Restructure their idea into exactly ONE beautiful, coherent 3-to-5 sentence diary entry strictly in English.
3. Keep the vocabulary and sentence structures appropriate for a 10-year-old, using simple, clear past-tense verbs (e.g., 'went', 'ate', 'played', 'saw', 'felt', 'was').
4. Help visual learners build their English vocabulary: punctuate the English diary heavily with contextually relevant emojis placed directly next to the key nouns or action verbs (e.g., 'Yesterday, I went 🏊 swimming at the pool. I played 🎮 games with my friends.').
5. You MUST return a JSON object with exactly two keys: "praise" and "diary".
   - "praise": a single bursting line of enthusiastic praise using celebratory emojis, praising their day and effort (e.g. 'Wow! What a fantastic day! 🎉🥳 You did an amazing job! 🌟').
   - "diary": the beautiful, structured English diary entry (3-to-5 sentences, heavily emoji-punctuated next to key words).
6. Do NOT include any markdown code blocks, HTML, bullet points, choices, or meta-commentary in your response. Output strictly valid JSON.`;

    const geminiRequestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Selected interface language: ${language || "English"}\nStudent's raw diary entry: ${studentInput}`
            }
          ]
        }
      ],
      systemInstruction: {
        parts: [
          {
            text: systemPrompt
          }
        ]
      },
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    try {
      const apiResponse = await fetch(geminiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(geminiRequestBody)
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error("Gemini API Error Response:", errorText);
        return new Response(JSON.stringify({ error: "Gemini API error occurred during processing." }), {
          status: apiResponse.status,
          headers: {
            "Content-Type": "application/json",
            ...trackingHeaders
          }
        });
      }

      const apiData = await apiResponse.json();
      
      // Parse Gemini response
      let aiText = "";
      if (apiData.candidates && apiData.candidates[0] && apiData.candidates[0].content && apiData.candidates[0].content.parts[0]) {
        aiText = apiData.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid response format from Gemini API");
      }

      // Check and parse JSON content from Gemini
      let restructuredData;
      try {
        restructuredData = JSON.parse(aiText.trim());
      } catch (err) {
        console.error("JSON parsing error of AI text:", aiText, err);
        // Fallback structure in case model output is slightly off JSON format
        restructuredData = {
          praise: "Fantastic job writing your holiday diary! 🎉🥳 You did an awesome job! 🌟",
          diary: aiText
        };
      }

      return new Response(JSON.stringify(restructuredData), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...trackingHeaders
        }
      });

    } catch (apiErr) {
      console.error("API Fetch Error:", apiErr);
      return new Response(JSON.stringify({ error: "Internal Server Error during AI restructuring." }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...trackingHeaders
        }
      });
    }
  }
};
