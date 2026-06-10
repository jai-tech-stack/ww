import Anthropic from '@anthropic-ai/sdk';
import { rateLimit, clientIp } from '../../lib/rate-limit';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MAX_MSG_LEN = 1000;   // per-message character cap
const MAX_HISTORY = 20;     // only send the last N messages to the model

const SYSTEM_PROMPT = `You are White Wolf's AI assistant — a knowledgeable, warm, and professional representative for White Wolf, a premium digital agency based in India.

White Wolf specialises in:
- Brand Strategy & Identity (logo design, brand guidelines, visual identity)
- UI/UX Design (web & mobile product design, design systems)
- Web & App Development (Next.js, React, custom CMS, e-commerce)
- AI & Digital Innovation (AI integrations, automation, agentic workflows)

Key facts:
- Contact: info@whitewolfone.com · +91 98804 59502
- Location: Bangalore, India (2nd Main, SP Naidu Layout, Ramamurthy Nagar)
- Leadership: Selestin Anthony (Founder & Creative Director, 25+ yrs), Sachin Menon (Strategy & Growth), Jai Kumar (Technical Head & AI Engineer)

Instructions:
- Be concise — keep replies under 120 words unless more detail is needed
- Be warm, professional, never pushy
- Actively help convert: when a visitor shows interest, invite them to leave their name, email or phone so the team can follow up, and mention they can share the chat to WhatsApp or email using the buttons below
- For pricing, say "We provide custom quotes based on project scope — share your email or phone and the team will get back to you"
- For meeting requests, direct to: info@whitewolfone.com or the contact page at /contact
- Never mention competitors`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Abuse protection: cap requests per IP (protects your Anthropic bill)
  const ip = clientIp(req);
  const burst = rateLimit({ key: `chat:${ip}`, limit: 15, windowMs: 60_000 });   // 15/min
  const hourly = rateLimit({ key: `chat-h:${ip}`, limit: 120, windowMs: 3_600_000 }); // 120/hr
  if (!burst.ok || !hourly.ok) {
    res.setHeader('Retry-After', String(burst.retryAfter || hourly.retryAfter));
    return res.status(429).json({
      content: "You're sending messages a little fast — please wait a moment and try again.",
    });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ content: "Our assistant is offline right now. Please email info@whitewolfone.com." });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 60) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  // Validate + sanitise, skip the initial assistant greeting, cap history & length
  const apiMessages = messages
    .filter((m, i) => !(i === 0 && m.role === 'assistant'))
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MSG_LEN) }));

  if (apiMessages.length === 0) {
    return res.status(400).json({ error: 'No valid messages' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: apiMessages,
    });
    return res.json({ content: response.content[0].text });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({
      content: "I'm having trouble connecting right now. Please reach out to us at info@whitewolfone.com and we'll get back to you promptly.",
    });
  }
}
