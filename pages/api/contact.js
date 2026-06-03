import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, company, email, country, projectType, budgetRange, details } = req.body;

  // Basic validation
  if (!name || !email || !details) {
    return res.status(400).json({ message: "Name, email and project details are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"White Wolf Website" <${process.env.SMTP_USER}>`,
      to: "selestin.s@gmail.com",
      replyTo: email,
      subject: `New Enquiry — ${projectType || "General"} | ${name}`,
      html: `
        <div style="font-family:'Karla',Arial,sans-serif;max-width:600px;margin:0 auto;background:#131021;color:#fff;border-radius:8px;overflow:hidden;">
          <div style="background:#6AAAC7;padding:24px 32px;">
            <h2 style="margin:0;color:#131021;font-size:1.4rem;">New Project Enquiry</h2>
            <p style="margin:4px 0 0;color:rgba(19,16,33,0.7);font-size:0.85rem;">White Wolf Website</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);width:140px;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;">Name</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;font-size:0.95rem;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;">Company</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;font-size:0.95rem;">${company || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#6AAAC7;font-size:0.95rem;"><a href="mailto:${email}" style="color:#6AAAC7;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;">Country</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;font-size:0.95rem;">${country || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;">Project Type</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#CBC16C;font-size:0.95rem;">${projectType || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;">Budget</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#BF6EB6;font-size:0.95rem;">${budgetRange || "—"}</td></tr>
            </table>
            <div style="margin-top:24px;">
              <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Project Details</p>
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(106,170,199,0.15);border-radius:6px;padding:16px;color:rgba(255,255,255,0.85);font-size:0.95rem;line-height:1.7;">${details.replace(/\n/g, "<br/>")}</div>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Message sent successfully." });
  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ message: "Failed to send message. Please try again." });
  }
}
