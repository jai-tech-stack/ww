import { rateLimit, clientIp } from '../../lib/rate-limit';
import { sendTeamEmail, mailerConfigured } from '../../lib/mailer';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// Allow the agent loop (multiple sequential model calls) enough time on Vercel.
// Default serverless timeout is 10s, which a tool-using loop can exceed.
export const config = { maxDuration: 30 };

const MAX_MSG_LEN = 1000;   // per-message character cap
const MAX_HISTORY = 24;     // only send the last N messages to the model
const MAX_TOOL_STEPS = 4;   // safety cap on the agent loop

const SYSTEM_PROMPT = `You are White Wolf's AI agent — a knowledgeable, warm, proactive representative for White Wolf, a premium digital agency based in Bangalore, India.

White Wolf specialises in:
- Brand Strategy & Identity (logo design, brand guidelines, visual identity)
- UI/UX Design (web & mobile product design, design systems)
- Web & App Development (Next.js, React, custom CMS, e-commerce)
- AI & Digital Innovation (AI integrations, automation, agentic workflows)

Key facts:
- Contact: info@whitewolfone.com · +91 98804 59502
- Location: Bangalore, India (2nd Main, SP Naidu Layout, Ramamurthy Nagar)
- Leadership: Selestin Anthony (Founder & Creative Director, 25+ yrs), Sachin Menon (Strategy & Growth), Jai Kumar (Senior Full-Stack Developer, 12+ yrs)

You have TOOLS and should use them autonomously:
- capture_lead: Call this the moment a visitor shares their name plus an email OR phone (or clearly wants the team to reach out). This notifies the team. Don't announce that you're "using a tool" — just naturally confirm you've passed their details on.
- request_human_callback: Call this when a visitor explicitly wants to talk to a human, has an urgent/complex need, or is clearly a high-intent lead.

Tone & personality (very important):
- Sound like a real, kind human — polite, humble, warm, gentle, and professional.
- Make every visitor feel genuinely welcomed, heard, and valued. Show warmth and empathy.
- Use natural, friendly language and a soft, respectful touch (e.g. "I'd be happy to help", "That sounds wonderful", "Thank you so much for reaching out").
- Never sound robotic, salesy, pushy, or scripted. Mirror the visitor's energy.
- A light, tasteful emoji now and then is fine — never overdo it.

Behaviour:
- Keep replies SHORT — 1 to 3 sentences, like texting. Be warm and natural.
- Do NOT use long numbered lists or bullet points unless the visitor explicitly asks for a breakdown. Answer directly, then ask one simple follow-up.
- Gather interest, then naturally ask for a name + email or phone so the team can follow up.
- Never invent pricing. Say something like "Every project is scoped to your needs — drop your email or phone and the team will send a tailored quote within a business day."
- Only call capture_lead ONCE per visitor unless they give new/updated details.
- After capturing a lead, reassure them briefly that the team will be in touch soon.
- Never mention competitors.`;

const TOOLS = [
  {
    name: 'capture_lead',
    description:
      'Save the visitor as a lead and email the White Wolf team. Call as soon as the visitor has shared their name and at least an email or phone, or asked to be contacted. Do not ask again for info you already have.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Visitor full name' },
        email: { type: 'string', description: 'Email address if shared' },
        phone: { type: 'string', description: 'Phone number if shared' },
        interest: { type: 'string', description: 'Service of interest, e.g. Branding, UI/UX, Development, AI' },
        summary: { type: 'string', description: 'One or two sentences on what the visitor needs' },
      },
      required: ['summary'],
    },
  },
  {
    name: 'request_human_callback',
    description:
      'Notify the team that a human should follow up — for explicit requests to talk to a person, urgent/complex needs, or high-intent leads. Include any known contact info.',
    input_schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        reason: { type: 'string', description: 'Why a human should follow up' },
      },
      required: ['reason'],
    },
  },
];

const GEMINI_TOOLS = [{
  functionDeclarations: TOOLS.map(({ name, description, input_schema }) => ({
    name,
    description,
    parameters: input_schema,
  })),
}];

async function generateGemini(contents) {
  const response = await fetch(
    `${GEMINI_API_URL}/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        tools: GEMINI_TOOLS,
        generationConfig: { maxOutputTokens: 600, temperature: 0.6 },
      }),
    }
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.error?.message || `Gemini request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  const candidate = data?.candidates?.[0];
  if (!candidate?.content?.parts) {
    throw new Error(candidate?.finishReason || 'Gemini returned no response');
  }
  return candidate.content;
}

async function runTool(name, input, messages) {
  const contact = { name: input.name, email: input.email, phone: input.phone };
  try {
    if (name === 'capture_lead') {
      await sendTeamEmail({
        subject: `New Lead${input.name ? ` — ${input.name}` : ''}`,
        contact,
        interest: input.interest,
        summary: input.summary,
        messages,
        source: 'AI Agent · capture_lead',
      });
      return 'Lead saved and the team has been notified by email. Confirm to the visitor that the team will follow up soon.';
    }
    if (name === 'request_human_callback') {
      await sendTeamEmail({
        subject: `Callback Request${input.name ? ` — ${input.name}` : ''}`,
        contact,
        summary: input.reason,
        messages,
        source: 'AI Agent · request_human_callback',
      });
      return 'Callback request sent to the team. Reassure the visitor a human will reach out shortly.';
    }
    return 'Unknown tool.';
  } catch (err) {
    console.error('Tool error:', name, err);
    if (!mailerConfigured()) {
      return 'Email is not configured, so the team was not notified automatically. Ask the visitor to email info@whitewolfone.com directly.';
    }
    return 'Could not notify the team automatically. Ask the visitor to email info@whitewolfone.com.';
  }
}

export default async function handler(req, res) {
  // Health check: open /api/chat in a browser to verify server config
  if (req.method === 'GET') {
    return res.json({
      status: 'ok',
      provider: 'google-gemini',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      model: GEMINI_MODEL,
      smtpConfigured: mailerConfigured(),
    });
  }
  if (req.method !== 'POST') return res.status(405).end();

  const ip = clientIp(req);
  const burst = rateLimit({ key: `chat:${ip}`, limit: 15, windowMs: 60_000 });
  const hourly = rateLimit({ key: `chat-h:${ip}`, limit: 120, windowMs: 3_600_000 });
  if (!burst.ok || !hourly.ok) {
    res.setHeader('Retry-After', String(burst.retryAfter || hourly.retryAfter));
    return res.status(429).json({ content: "You're sending messages a little fast — please wait a moment and try again." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ content: 'Our assistant is offline right now. Please email info@whitewolfone.com.' });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 60) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  // Validate + sanitise, drop the initial greeting, cap history & length
  const apiMessages = messages
    .filter((m, i) => !(i === 0 && m.role === 'assistant'))
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content.slice(0, MAX_MSG_LEN) }],
    }));

  if (apiMessages.length === 0) return res.status(400).json({ error: 'No valid messages' });

  try {
    const convo = [...apiMessages];
    const toolsUsed = [];
    let finalText = '';

    for (let step = 0; step < MAX_TOOL_STEPS; step++) {
      const responseContent = await generateGemini(convo);
      const text = responseContent.parts.map((part) => part.text || '').join('').trim();
      const toolUses = responseContent.parts.filter((part) => part.functionCall);

      if (toolUses.length > 0) {
        convo.push({ role: 'model', parts: responseContent.parts });

        const results = [];
        for (const part of toolUses) {
          const call = part.functionCall;
          const input = call.args || {};
          const out = await runTool(call.name, input, messages);
          toolsUsed.push({ name: call.name, input });
          results.push({ functionResponse: { name: call.name, response: { result: out } } });
        }
        convo.push({ role: 'user', parts: results });
        continue; // let the model respond to the tool results
      }

      finalText = text;
      break;
    }

    if (!finalText) finalText = 'Thanks! Is there anything else I can help you with?';
    return res.json({ content: finalText, toolsUsed });
  } catch (err) {
    const status = err?.status || err?.statusCode || null;
    console.error('Chat API error:', status, err?.name, err?.message);
    return res.status(500).json({
      content: "I'm having trouble connecting right now. Please reach out to us at info@whitewolfone.com and we'll get back to you promptly.",
      // Safe diagnostics (no secrets) so the cause is visible in the Network tab
      reason: err?.name || 'Error',
      detail: err?.message || 'unknown',
      upstreamStatus: status,
    });
  }
}
