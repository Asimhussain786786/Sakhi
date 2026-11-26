import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      reply: "I hear you, sweetheart. 💕 Remember that taking a deep breath and grounding yourself right now is your first act of self-love. You are never alone in this journey. What is the heaviest feeling sitting in your chest right now?",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const conversationContext = Array.isArray(history)
      ? history
          .slice(-6)
          .map((h: { role: string; content: string }) => `${h.role === 'user' ? 'Client' : 'Dr. Maya'}: ${h.content}`)
          .join('\n')
      : '';

    const systemPrompt = `You are Dr. Maya, a deeply warm, compassionate, empathetic counseling therapist and mindful mentor specializing in young women's mental health, burnout, relationship tensions, emotional overwhelm, and hormonal mood swings.
Your tone is soothing, validating, gentle, sisterly yet professional, using soft warm emojis like 🌸, 🌿, ☕, 💖 in moderation.
Always validate their feelings first. Offer grounded somatic tips (like relaxing the jaw, unclamping the shoulders, or drinking warm chamomile tea) when helpful.
If the user mentions severe self-harm or immediate crisis, gently remind them of emergency crisis hotlines like Tele-MANAS (14416) or KIRAN (1800-599-0019) with tenderness.
Keep your response concise yet comforting (around 2-4 short paragraphs maximum).`;

    const fullPrompt = `${systemPrompt}\n\nPrevious conversation:\n${conversationContext}\n\nClient: ${message}\n\nDr. Maya:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
    });

    const reply = response.text || "I'm right here with you, dear. Let's take a slow breath together. 🌸";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Therapist API error:', error);
    return res.status(200).json({
      reply: "I'm listening with all my heart, darling. 🌸 Even when words feel tangled, give yourself credit for reaching out. Let's take a gentle breath in... and out. How can I best support you in this moment?",
    });
  }
}
