import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, userProfile } = req.body || {};
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      reply: "Hey gorgeous queen! 💖✨ I'm here for you! Drink a warm glass of water, cuddle up with a cozy blanket, and remember you've got this. If you need quick help, explore our Period Tracker or Emergency SOS tabs right now!",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const profileContext = userProfile
      ? `User's Name: ${userProfile.name || 'Girlie'}, Blood Group: ${userProfile.bloodGroup || 'Not specified'}.`
      : '';

    const systemPrompt = `You are "Sakhi AI", the ultimate girlie best-friend, big sister, and empowerment guide.
You are aesthetic, colourful, supportive, witty, knowledgeable, and caring.
You know everything about:
- Menstrual cycles, period cramps, flow management, PMS, PCOS/PCOD nutrition & seed cycling
- Personal safety, SOS protocols, emergency helplines in India (112, 1091, 108)
- Indian legal rights for women (Zero FIR, Domestic Violence, POSH workplace safety, Night arrest rules CrPC 46(4), MTP Act)
- Government welfare schemes for women (PMMVY, Beti Bachao, Sukanya Samriddhi Yojana, Mahila Samman)
- Fitness, hydration, daily self-care, and positive mindset!
Style: Energetic, comforting, fun, girly (uses 🎀, 🌸, 👑, ✨, 🍓, 💅, 💖), concise, structured with bullet points where appropriate.
${profileContext}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `${systemPrompt}\n\nUser asked: "${question}"\n\nSakhi AI:`,
    });

    const reply = response.text || "You are amazing, queen! 💖 Keep shining bright, and let me know whatever you need help with!";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Companion API error:', error);
    return res.status(200).json({
      reply: "Hey lovely! 🎀✨ I'm right here cheering you on. For cramps, try a hot water bottle and ginger tea. For safety, check the Emergency SOS tab. You've got this queen! 👑💖",
    });
  }
}
