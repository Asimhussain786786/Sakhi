import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Dr. Maya therapist endpoint
app.post('/api/therapist', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: "I hear you, sweetheart. 💕 Remember that taking a deep breath and grounding yourself right now is your first act of self-love. You are never alone in this journey. What is the heaviest feeling sitting in your chest right now?",
      });
    }

    const conversationContext = Array.isArray(history)
      ? history
          .slice(-6)
          .map((h) => `${h.role === 'user' ? 'Client' : 'Dr. Maya'}: ${h.content}`)
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
    return res.json({ reply });
  } catch (error) {
    console.error('Therapist API error:', error);
    return res.json({
      reply: "I'm listening with all my heart, darling. 🌸 Even when words feel tangled, give yourself credit for reaching out. Let's take a gentle breath in... and out. How can I best support you in this moment?",
    });
  }
});

// Sakhi AI Companion endpoint
app.post('/api/companion', async (req, res) => {
  try {
    const { question, userProfile } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: "Hey gorgeous queen! 💖✨ I'm here for you! Drink a warm glass of water, cuddle up with a cozy blanket, and remember you've got this. If you need quick help, explore our Period Tracker or Emergency SOS tabs right now!",
      });
    }

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
    return res.json({ reply });
  } catch (error) {
    console.error('Companion API error:', error);
    return res.json({
      reply: "Hey lovely! 🎀✨ I'm right here cheering you on. For cramps, try a hot water bottle and ginger tea. For safety, check the Emergency SOS tab. You've got this queen! 👑💖",
    });
  }
});

// Vite or Static file serving
async function setupVite() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sakhi app server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
