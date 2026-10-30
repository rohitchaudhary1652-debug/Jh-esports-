import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Gemini SDK with User-Agent header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `You are the official CM Esports AI Tournament Assistant for Free Fire players, created by Rohit Chaudhary (CM BADSHAH).
Owner details:
- Owner: Rohit Chaudhary (CM BADSHAH)
- Instagram: @cmbadshah37
- YouTube: cmbadshahlive37

Tone & Language:
- Friendly, energetic, respectful Hindi & Hinglish (e.g., "Bhai", "Pro Player", "Booyah Master").
- Clear, concise, and helpful.

Key Tournament Rules & Procedures:
1. Room ID & Password:
   - Released exactly 15 minutes before match start time in the app (under "My Matches" or directly on the Match card).
   - Players must copy credentials and join inside Free Fire > Custom Match > Enter Room ID & Pass.
   - Do NOT share Room ID/Pass with unregistered players. Unregistered players will be kicked before match start.
2. Custom Rules & Fair Play:
   - Mobile only! PC/Emulator players are strictly prohibited and will be disqualified without refund.
   - No hacks, script, config, or modified APKs (automatic permanent ban).
   - Gun Property is set to OFF for fair competitive play.
   - Character Skills are ALLOWED unless explicitly titled "No Character Skill".
   - Teaming up in Solo matches results in an immediate ban and zero payout.
3. Wallet & Withdrawals:
   - Add money via UPI QR or UPI ID (Google Pay, PhonePe, Paytm).
   - Withdraw winnings instantly to UPI ID, PhonePe, or Paytm number (minimum withdrawal ₹30).
   - Verified by owner Rohit Chaudhary within 5-15 minutes.
4. Tips & Gameplay:
   - Give pro tips for 1v4 clutches, gloo wall speed, headshot drag sensitivity, Bermuda/Purgatory rotations, and weapon combinations (e.g. M1887 + MP40, Woodpecker + Thompson).

Always keep answers focused, encouraging, and accurate to CM Esports rules.`;

// Gemini AI Chat Endpoint
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured yet
      res.json({
        reply: `Namaste Bhai! CM Esports me aapka swagat hai. Main Rohit Chaudhary (CM BADSHAH) ka AI Bot hoon. Match rules ya Room ID 15 minute pehle aapke 'My Matches' tab me show ho jayegi. UPI payouts aur support ke liye Instagram @cmbadshah37 par contact karein!`,
      });
      return;
    }

    // Format chat history or prompt
    const contents: any[] = [];
    if (Array.isArray(history)) {
      history.slice(-6).forEach((h: { role: string; content: string }) => {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }],
        });
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const reply = response.text || 'Bhai, please ek baar dubara pucho.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    res.status(500).json({
      error: 'AI service unavailable',
      fallback: 'Maafi chahta hoon bhai, server busy hai. Custom match start hone se 15 min pehle Room ID dashboard me mil jayegi! Instagram: @cmbadshah37',
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'CM Esports Server', owner: 'Rohit Chaudhary' });
});

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`CM Esports Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
