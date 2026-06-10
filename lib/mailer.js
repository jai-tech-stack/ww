import nodemailer from "nodemailer";

export const LEADS_EMAIL = process.env.LEADS_EMAIL || "info@whitewolfone.com";

export function mailerConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function transcriptRows(messages = []) {
  return messages
    .map((m) => {
      const who = m.role === "user" ? "Visitor" : "White Wolf AI";
      const color = m.role === "user" ? "#6AAAC7" : "#BF6EB6";
      const safe = String(m.content || "").replace(/</g, "&lt;").replace(/\n/g, "<br/>");
      if (!safe.trim()) return "";
      return `<tr>
        <td style="padding:8px 12px;vertical-align:top;color:${color};font-weight:700;font-size:0.8rem;white-space:nowrap;">${who}</td>
        <td style="padding:8px 12px;color:rgba(255,255,255,0.85);font-size:0.92rem;line-height:1.6;">${safe}</td>
      </tr>`;
    })
    .join("");
}

/**
 * Send a lead / conversation notification to the team.
 */
export async function sendTeamEmail({ subject, contact = {}, summary = "", interest = "", messages = [], source = "AI Agent" }) {
  if (!mailerConfigured()) throw new Error("SMTP not configured");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const plain =
    `${source}\n\n` +
    `Name: ${contact.name || "—"} | Email: ${contact.email || "—"} | Phone: ${contact.phone || "—"}\n` +
    (interest ? `Interest: ${interest}\n` : "") +
    (summary ? `Summary: ${summary}\n` : "") +
    `\n` +
    messages.map((m) => `${m.role === "user" ? "Visitor" : "AI"}: ${m.content}`).join("\n");

  await transporter.sendMail({
    from: `"White Wolf Chat" <${process.env.SMTP_USER}>`,
    to: LEADS_EMAIL,
    replyTo: contact.email || process.env.SMTP_USER,
    subject: subject || `New Lead${contact.name ? ` — ${contact.name}` : ""}`,
    text: plain,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;background:#131021;color:#fff;border-radius:8px;overflow:hidden;">
        <div style="background:#6AAAC7;padding:20px 28px;">
          <h2 style="margin:0;color:#131021;font-size:1.25rem;">${subject || "New Lead from AI Agent"}</h2>
          <p style="margin:4px 0 0;color:rgba(19,16,33,0.7);font-size:0.82rem;">${source}</p>
        </div>
        <div style="padding:20px 28px;border-bottom:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0;color:rgba(255,255,255,0.55);font-size:0.78rem;text-transform:uppercase;letter-spacing:0.08em;">Lead details</p>
          <p style="margin:6px 0 0;font-size:0.95rem;line-height:1.7;">
            <strong>${contact.name || "Not provided"}</strong><br/>
            ${contact.email ? `<a href="mailto:${contact.email}" style="color:#6AAAC7;">${contact.email}</a><br/>` : ""}
            ${contact.phone ? `${contact.phone}<br/>` : ""}
            ${interest ? `<span style="color:#CBC16C;">Interested in: ${interest}</span><br/>` : ""}
          </p>
          ${summary ? `<p style="margin:10px 0 0;color:rgba(255,255,255,0.8);font-size:0.95rem;line-height:1.6;"><em>${summary}</em></p>` : ""}
        </div>
        <div style="padding:12px 16px;">
          <table style="width:100%;border-collapse:collapse;">${transcriptRows(messages)}</table>
        </div>
      </div>`,
  });
}
