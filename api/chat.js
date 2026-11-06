import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from './_lib/prompt.js';
import { buildKnowledge } from './_lib/knowledge.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, persona = 'tech', history = [] } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const knowledge = buildKnowledge();
  const fullSystemInstruction = `${SYSTEM_PROMPT}\n\nACTIVE PERSONA: ${persona}\n\nVERIFIED PROFILE KNOWLEDGE:\n${knowledge}`;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Graceful offline fallback
    return res.status(200).json({
      reply: `Shrikant Subhash Kudale is an AI & Analytics Engineer (B.Tech MIT-ADT, CGPA 8.25) and Psychology graduate (B.A. Hons IGNOU, 70% First Class). He published a Transformer biomarker paper in IJARSCT (87.4% accuracy) and deploys edge YOLOv8 systems on Raspberry Pi. You can connect with him directly at shrikant.kudale05@gmail.com.`,
      engine: 'System Knowledge Engine (Offline mode)'
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: message,
      config: {
        systemInstruction: fullSystemInstruction,
        temperature: 0.3,
        maxOutputTokens: 600
      }
    });

    res.setHeader('X-Engine-Used', 'google-gemini-2.5-flash-lite');
    return res.status(200).json({
      reply: response.text,
      engine: 'Google Gemini 2.5 Flash-Lite'
    });
  } catch (err) {
    return res.status(200).json({
      reply: `I am currently operating in offline mode. Shrikant is an AI Engineer and Cognitive Science researcher specializing in edge vision on Raspberry Pi Zero 2 W and cognitive offloading memory research. Contact him at shrikant.kudale05@gmail.com.`,
      engine: 'Grounded Profile Knowledge'
    });
  }
}
