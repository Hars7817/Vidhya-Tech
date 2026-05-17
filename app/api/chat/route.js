export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.message || !body.message.trim()) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ Missing GEMINI_API_KEY");
      return Response.json(
        { error: 'Missing GEMINI_API_KEY in environment' },
        { status: 500 }
      );
    }

    console.log("📨 Chat Request:", body.message);

    // Fetch available models
    const modelListResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    if (!modelListResponse.ok) {
      console.error("❌ Failed to fetch model list:", modelListResponse.statusText);
      return Response.json(
        { error: "Failed to fetch available models" },
        { status: 500 }
      );
    }

    const modelList = await modelListResponse.json();
    const availableModels = modelList.models || [];

    if (availableModels.length === 0) {
      console.error("❌ No models available:", modelList);
      return Response.json(
        { error: "No models available for AI generation" },
        { status: 500 }
      );
    }

    const selectedModel = availableModels[0].name; // Use the first available model

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: body.message }],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      console.error("❌ Gemini API error:", res.status, res.statusText);
      const errorData = await res.text();
      console.error("Error details:", errorData);
      return Response.json(
        { error: `Gemini API error: ${res.statusText}` },
        { status: 500 }
      );
    }

    const data = await res.json();

    if (!data.candidates || !data.candidates[0]) {
      console.warn("⚠️ No candidates in response:", data);
      return Response.json(
        { text: "I'm processing your request. Please try again." },
        { status: 200 }
      );
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response.";

    console.log("✅ AI Response:", reply.substring(0, 100) + "...");

    return Response.json({ text: reply });
  } catch (err) {
    console.error("❌ Chat Error:", err.message);
    console.error("Stack:", err.stack);
    return Response.json(
      { error: err.message || "Failed to process your message" },
      { status: 500 }
    );
  }
}