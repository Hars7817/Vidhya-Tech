export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.message || !body.message.trim()) {
      return Response.json(
        { text: "Please type a message!" },
        { status: 200 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ Missing GEMINI_API_KEY");
      return Response.json(
        { text: "AI service is not configured. Please try again later." },
        { status: 200 }
      );
    }

    console.log("📨 Chat Request:", body.message);

    const systemPrompt =
      "You are a helpful, friendly customer support assistant for Vidhya Tech, a digital agency. Provide concise, professional responses (under 150 words). Be warm and approachable. If asked about services, mention web development, digital marketing, and custom IT solutions.";

    // Use gemini-1.5-flash model with a supported systemInstruction payload
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            role: "system",
            parts: [{ text: systemPrompt }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: body.message }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 250,
          },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data?.error?.message || res.statusText;
      console.error("❌ Gemini API error:", res.status, errorMsg);
      
      // Return a helpful fallback response
      return Response.json(
        { text: "I'm having a brief moment of confusion. Could you rephrase that?" },
        { status: 200 }
      );
    }

    // Validate response structure
    if (!data.candidates || data.candidates.length === 0) {
      console.warn("⚠️ No candidates in response");
      return Response.json(
        { text: "I'm not sure how to respond to that. Can you ask something else?" },
        { status: 200 }
      );
    }

    const candidate = data.candidates[0];
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      console.warn("⚠️ No content parts in candidate");
      return Response.json(
        { text: "Let me think about that... Could you rephrase your question?" },
        { status: 200 }
      );
    }

    const reply = candidate.content.parts[0].text || null;

    if (!reply || reply.trim().length === 0) {
      console.warn("⚠️ Empty reply text");
      return Response.json(
        { text: "I'm thinking... Please try asking again!" },
        { status: 200 }
      );
    }

    console.log("✅ AI Response:", reply.substring(0, 100));

    return Response.json({ text: reply });
  } catch (err) {
    console.error("❌ Chat Error:", err.message);
    console.error("Stack:", err.stack);
    
    // Always return 200 with a friendly message
    return Response.json(
      { text: "I encountered a hiccup. How else can I help you?" },
      { status: 200 }
    );
  }
}
