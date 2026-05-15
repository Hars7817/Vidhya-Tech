import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  try {
    const apiKey = (process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      '')
      .trim()
      .replace(/^['"]|['"]$/g, '');

    if (!apiKey) {
      return res.status(500).json({
        error:
          'Gemini API key is missing. Set GEMINI_API_KEY (or GOOGLE_API_KEY) in .env.local.',
      });
    }

    const { message } = req.body;
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message must be a non-empty string.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelCandidates = [
      process.env.GEMINI_MODEL,
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
    ].filter((value, index, arr) => value && arr.indexOf(value) === index);

    let lastError = null;

    for (const modelName of modelCandidates) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ text, model: modelName });
      } catch (error) {
        lastError = error;

        if (error?.status !== 404) {
          break;
        }
      }
    }

    throw lastError || new Error('No Gemini model could generate content.');
  } catch (error) {
    console.error('Gemini chat error:', error);

    const invalidKey =
      error?.status === 400 &&
      Array.isArray(error?.errorDetails) &&
      error.errorDetails.some((detail) => detail?.reason === 'API_KEY_INVALID');

    if (invalidKey) {
      return res.status(401).json({
        error: 'Gemini API key is invalid or blocked.',
        details:
          'Create a new key in Google AI Studio, update .env.local, and restart `npm run dev`.',
      });
    }

    return res.status(500).json({
      error: 'Failed to generate response from Gemini.',
      details: error?.message || 'Unknown error',
    });
  }
}