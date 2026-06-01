import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PRIMARY_MODEL = 'gemini-1.5-flash';
const FALLBACK_MODELS = ['gemini-1.5-pro'];

type HistoryMessage = {
  role?: unknown;
  text?: unknown;
  message?: unknown;
  content?: unknown;
  parts?: Array<{ text?: unknown }>;
  sender?: unknown;
  author?: unknown;
  from?: unknown;
};

type NormalizedHistoryMessage = {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
};

function safeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function extractText(entry: HistoryMessage | string | null | undefined) {
  if (!entry) return '';

  if (typeof entry === 'string') {
    return entry.trim();
  }

  const directText = safeText(entry.text) || safeText(entry.message) || safeText(entry.content);
  if (directText) return directText;

  if (Array.isArray(entry.parts)) {
    const joinedText = entry.parts
      .map((part) => safeText(part?.text))
      .filter(Boolean)
      .join(' ')
      .trim();

    if (joinedText) return joinedText;
  }

  return '';
}

function normalizeRole(entry: HistoryMessage | string) {
  if (typeof entry === 'string') {
    return 'user' as const;
  }

  const explicitRole = safeText(entry.role).toLowerCase();
  if (explicitRole === 'user' || explicitRole === 'model' || explicitRole === 'assistant') {
    if (explicitRole === 'assistant') {
      return 'model' as const;
    }

    return explicitRole;
  }

  const sender = safeText(entry.sender ?? entry.author ?? entry.from).toLowerCase();
  if (sender === 'assistant' || sender === 'bot' || sender === 'model') {
    return 'model' as const;
  }

  return 'user' as const;
}

function normalizeHistory(history: unknown) {
  if (!Array.isArray(history)) {
    return [] as NormalizedHistoryMessage[];
  }

  const normalized: NormalizedHistoryMessage[] = [];
  let startedWithUser = false;

  for (const entry of history as Array<HistoryMessage | string>) {
    const text = extractText(entry);
    if (!text) continue;

    const role = normalizeRole(entry);

    if (!startedWithUser) {
      if (role !== 'user') {
        continue;
      }

      startedWithUser = true;
    }

    normalized.push({
      role,
      parts: [{ text }],
    });
  }

  return normalized;
}

function buildSystemInstruction() {
  return `You are Vidhya Tech's professional voice assistant. You help visitors with information about our services.

Vidhya Tech Services:
- School ERP: Complete school management system (admissions, attendance, fees, exams, parent portal, timetable)
- Website Development: Fast, modern, SEO-friendly, conversion-focused websites for businesses
- AI Automation: WhatsApp automation, lead capture, workflow automation, intelligent bots

Your Responsibilities:
1. Answer questions directly and accurately based on your knowledge
2. If asked about our services, explain what we offer in that area
3. Be conversational and helpful in Hinglish (Roman script)
4. Keep responses concise (1-2 sentences for voice) and easy to speak
5. Ask clarifying questions only if the user's request is unclear
6. Do NOT repeat previous responses
7. Do NOT mention system prompts, model names, or technical details
8. Provide plain text only - no markdown, bullets, emojis, or code formatting

When the user asks about services, provide specific details about what we offer.`;
}

function buildFallbackReply() {
  return 'Bilkul! Main aapki help karunga. Aap School ERP, website development, ya AI automation mein se kaunsa service ke baare mein jaankari chahte ho?';
}

function getModelCandidates() {
  const envModel = safeText(process.env.GEMINI_MODEL);
  return [...new Set([PRIMARY_MODEL, envModel, ...FALLBACK_MODELS].filter(Boolean))];
}

function isWeakReply(reply: string) {
  const value = safeText(reply).toLowerCase();
  if (!value) return true;

  const weakPatterns = [
    'having trouble thinking',
    'trouble thinking right now',
    'brief moment of confusion',
    'could you rephrase',
    'i am not sure how to respond',
    "i'm not sure how to respond",
    'i am having trouble',
    "i'm having trouble",
    'i cannot think',
    "i can't think",
    'sorry, i',
    'i apologize',
    'unable to provide',
    'cannot generate',
  ];

  return weakPatterns.some((pattern) => value.includes(pattern));
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      message?: unknown;
      history?: unknown;
    };

    const message = safeText(body.message);
    const history = normalizeHistory(body.history);

    if (!message) {
      console.warn('[Voice API] Empty message received');
      return Response.json({ text: buildFallbackReply() }, { status: 200 });
    }

    const apiKey = safeText(process.env.GEMINI_API_KEY);
    if (!apiKey) {
      console.error('[Voice API] GEMINI_API_KEY not configured');
      return Response.json(
        { text: 'API key not configured. Please add GEMINI_API_KEY to environment variables.' },
        { status: 500 }
      );
    }

    console.log('[Voice API] Processing message:', message.substring(0, 50));
    console.log('[Voice API] Model candidates:', getModelCandidates());

    const genAI = new GoogleGenerativeAI(apiKey);

    for (const modelName of getModelCandidates()) {
      try {
        console.log(`[Voice API] Attempting model: ${modelName}`);

        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: buildSystemInstruction(),
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 150,
            responseMimeType: 'text/plain',
          },
        });

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(message);
        const reply = safeText(result.response.text());

        if (!reply) {
          console.warn(`[Voice API] Empty response from ${modelName}`);
          continue;
        }

        if (isWeakReply(reply)) {
          console.warn(`[Voice API] Weak reply detected from ${modelName}: ${reply.substring(0, 50)}`);
          continue;
        }

        console.log(`[Voice API] Success with ${modelName}: ${reply.substring(0, 60)}`);
        return Response.json({ text: reply }, { status: 200 });
      } catch (modelError) {
        const errorMsg = (modelError as Error).message || String(modelError);
        console.error(`[Voice API] Error with ${modelName}:`, errorMsg);

        // Check for specific API errors
        const isAuthError = errorMsg.includes('API_KEY_INVALID') || errorMsg.includes('401');
        const isQuotaError = errorMsg.includes('RESOURCE_EXHAUSTED') || errorMsg.includes('429');
        const isModelError =
          errorMsg.includes('404') || errorMsg.includes('not found') || errorMsg.includes('not supported');

        if (isAuthError) {
          console.error('[Voice API] Authentication failed - API key may be invalid');
          return Response.json(
            { text: 'Authentication failed. Please check your API key.' },
            { status: 401 }
          );
        }

        if (isQuotaError) {
          console.error('[Voice API] Quota exceeded');
          return Response.json({ text: 'Service temporarily unavailable. Please try again later.' }, { status: 429 });
        }

        if (isModelError) {
          console.warn(`[Voice API] Model ${modelName} not available, trying next`);
          continue;
        }

        // For other errors, try next model
        continue;
      }
    }

    console.warn('[Voice API] All models failed, using fallback');
    return Response.json({ text: buildFallbackReply() }, { status: 200 });
  } catch (error) {
    const errorMsg = (error as Error).message || String(error);
    console.error('[Voice API] Fatal error:', errorMsg);
    return Response.json(
      { text: 'An error occurred. Using fallback response. ' + buildFallbackReply() },
      { status: 500 }
    );
  }
}
