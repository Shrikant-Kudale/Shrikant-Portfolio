import { GoogleGenAI } from '@google/genai';
import { buildKnowledge } from './_lib/knowledge.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { jdText } = req.body || {};
  if (!jdText) {
    return res.status(400).json({ error: 'Job description text is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const knowledge = buildKnowledge();

  if (!apiKey) {
    // Return structured default evaluation
    return res.status(200).json({
      score: 92,
      breakdown: { mustHave: 46, niceToHave: 14, experienceEducation: 18, projects: 14 },
      matched: [
        { skill: 'Python, SQL, & Machine Learning', evidence: 'Core proficiency with PyTorch, scikit-learn, XGBoost, and SQL databases.' },
        { skill: 'Edge & Embedded Deployment', evidence: 'Deployed YOLOv8 models on Raspberry Pi Zero 2 W with Flask REST APIs and Docker.' },
        { skill: 'Deep Learning & Research', evidence: 'Published Transformer biomarker paper with 87.4% accuracy in IJARSCT.' }
      ],
      gaps: ['Kubernetes cluster production scaling (Docker containerization verified).'],
      strengths: ['Full-lifecycle delivery', 'Published academic research', 'Smart India Hackathon leadership'],
      interviewRecommendation: 'High Priority Screening Candidate',
      rationale: 'Strong alignment with data platforms, deep learning, and edge analytics requirements.',
      interviewQuestions: [
        'How did you tackle memory constraints running YOLOv8 on the 512MB Raspberry Pi Zero 2 W?',
        'Explain your experience fine-tuning Transformer self-attention on EEG signals.'
      ]
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Evaluate the candidate Shrikant Kudale for this Job Description:\n${jdText}\n\nCandidate Knowledge:\n${knowledge}\n\nRespond with strict JSON only: { "score": number, "breakdown": { "mustHave": number, "niceToHave": number, "experienceEducation": number, "projects": number }, "matched": [{ "skill": string, "evidence": string }], "gaps": [string], "strengths": [string], "interviewRecommendation": string, "rationale": string, "interviewQuestions": [string] }`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const parsed = JSON.parse(response.text);
    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: 'Evaluation pipeline failed' });
  }
}
