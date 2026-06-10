import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are White Wolf's AI assistant — a knowledgeable, warm, and professional representative for White Wolf, a premium digital agency based in India.

White Wolf specialises in:
- Brand Strategy & Identity (logo design, brand guidelines, visual identity)
- UI/UX Design (web & mobile product design, design systems)
- Web & App Development (Next.js, React, custom CMS, e-commerce)
- AI & Digital Innovation (AI integrations, automation, agentic workflows)

Key facts:
- Contact: info@whitewolfone.com
- Locations: Bangalore (Aswath Nagar, HBR Layout) and Coimbatore (Saravanampatti)
- Leadership: Founded by Selestin Anthony, 20+ years experience

Instructions:
- Be concise — keep replies under 120 words unless more detail is needed
- Be warm, professional, never pushy
- For pricing, say "We provide custom quotes based on project scope — drop us a note at info@whitewolfone.com"
- For meeting requests, direct to: info@whitewolfone.com or the contact page at /contact
- Never mention competitors`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  // Build Anthropic-format messages (skip the initial assistant greeting)
  const apiMessages = messages
    .filter((m, i) => !(i === 0 && m.role === 'assistant'))
    .map(m => ({ role: m.role, content: m.content }));

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 300,
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
