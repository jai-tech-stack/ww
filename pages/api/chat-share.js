import nodemailer from "nodemailer";

const LEADS_EMAIL = process.env.LEADS_EMAIL || "info@whitewolfone.com";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { messages, contact = {}, source = "AI Chat Widget" } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ message: "No conversation to share." });
  }

  // Only send if there's at least one real visitor message
  const userMsgs = messages.filter((m) => m.role === "user");
  if (userMsgs.length === 0) {
    return res.status(200).json({ message: "Nothing to share." });
  }

  const rows = messages
    .map((m) => {
      const who = m.role === "user" ? "Visitor" : "White Wolf AI";
      const color = m.role === "user" ? "#6AAAC7" : "#BF6EB6";
      const safe = String(m.content || "").replace(/</g, "&lt;").replace(/\n/g, "<br/>");
      return `<tr>
        <td style="padding:8px 12px;vertical-align:top;color:${color};font-weight:700;font-size:0.8rem;white-space:nowrap;">${who}</td>
        <td style="padding:8px 12px;color:rgba(255,255,255,0.85);font-size:0.92rem;line-height:1.6;">${safe}</td>
      </tr>`;
    })
    .join("");

  const plain = messages
    .map((m) => `${m.role === "user" ? "Visitor" : "AI"}: ${m.content}`)
    .join("\n");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"White Wolf Chat" <${process.env.SMTP_USER}>`,
      to: LEADS_EMAIL,
      replyTo: contact.email || process.env.SMTP_USER,
      subject: `New Chat Conversation${contact.name ? ` — ${contact.name}` : ""}`,
      text: `${source}\n\nVisitor: ${contact.name || "—"} | ${contact.email || "—"} | ${contact.phone || "—"}\n\n${plain}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#131021;color:#fff;border-radius:8px;overflow:hidden;">
          <div style="background:#6AAAC7;padding:20px 28px;">
            <h2 style="margin:0;color:#131021;font-size:1.25rem;">New Chat Conversation</h2>
            <p style="margin:4px 0 0;color:rgba(19,16,33,0.7);font-size:0.82rem;">${source}</p>
          </div>
          <div style="padding:20px 28px;border-bottom:1px solid rgba(255,255,255,0.08);">
            <p style="margin:0;color:rgba(255,255,255,0.55);font-size:0.78rem;text-transform:uppercase;letter-spacing:0.08em;">Visitor details</p>
            <p style="margin:6px 0 0;font-size:0.95rem;">
              <strong>${contact.name || "Not provided"}</strong><br/>
              ${contact.email ? `<a href="mailto:${contact.email}" style="color:#6AAAC7;">${contact.email}</a><br/>` : ""}
              ${contact.phone ? `${contact.phone}` : ""}
            </p>
          </div>
          <div style="padding:12px 16px;">
            <table style="width:100%;border-collapse:collapse;">${rows}</table>
          </div>
        </div>`,
    });

    return res.status(200).json({ message: "Conversation shared." });
  } catch (err) {
    console.error("Chat share error:", err);
    return res.status(500).json({ message: "Failed to share conversation." });
  }
}
