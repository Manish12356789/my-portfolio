import sendgrid from "@sendgrid/mail"
import type { NextApiRequest, NextApiResponse } from "next"

sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? "")

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { name, email, subject, message } = req.body ?? {}

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required" })
  }

  const to = process.env.CONTACT_RECEIVER_EMAIL
  const from = process.env.CONTACT_SENDER_EMAIL

  if (!process.env.SENDGRID_API_KEY || !to || !from) {
    console.error("Missing SendGrid environment variables")
    return res.status(500).json({ error: "Email service is not configured" })
  }

  try {
    await sendgrid.send({
      to, // your email
      from, // must be a verified sender in SendGrid
      replyTo: email || undefined, // so you can reply directly to the visitor
      subject: String(subject || "New contact form message").slice(0, 200),
      html: `
        <div>
          <h3>New message from your website</h3>
          <p><strong>Name:</strong> ${escapeHtml(String(name))}</p>
          ${email ? `<p><strong>Email:</strong> ${escapeHtml(String(email))}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(String(message)).replace(/\n/g, "<br/>")}</p>
        </div>`
    })
  } catch (e: any) {
    console.error(e?.response?.body ?? e)
    return res.status(e.code || 500).json({ error: "Failed to send email" })
  }

  return res.status(200).json({ error: "" })
}

export default sendEmail
