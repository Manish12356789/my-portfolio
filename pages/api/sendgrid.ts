import sendgrid from "@sendgrid/mail"
import type { NextApiRequest, NextApiResponse } from "next"

// IMPORTANT: this key must stay server-only. Do NOT prefix it with
// NEXT_PUBLIC_ (that prefix tells Next.js to bundle the value into the
// client-side JavaScript, which would leak it). See .env.example.
sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  try {
    await sendgrid.send({
      to: process.env.CONTACT_RECEIVER_EMAIL!, // where contact-form messages are delivered
      from: process.env.CONTACT_SENDER_EMAIL!, // must be a SendGrid-verified sender
      subject: `${req.body.subject}`,
      html: `
      <div>New email!
        <p>Name: ${req.body.name}</p> 
        <p>Message: ${req.body.message}</p>
      </div>` // Change this to your email content
    })
  } catch (e: any) {
    return res.status(e.statusCode || 500).json({ error: e.message })
  }

  return res.status(200).json({ error: "" })
}

export default sendEmail
