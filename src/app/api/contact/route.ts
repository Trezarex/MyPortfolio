import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password (not your login password)
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio — message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;background:#0d0d1a;color:#e0e0e0;border-radius:12px;border:1px solid #1e1e3a">
          <h2 style="color:#00f0ff;margin-top:0">New message from your portfolio</h2>
          <p><strong style="color:#aaa">Name:</strong> ${name}</p>
          <p><strong style="color:#aaa">Email:</strong> <a href="mailto:${email}" style="color:#00f0ff">${email}</a></p>
          <hr style="border-color:#1e1e3a;margin:16px 0"/>
          <p><strong style="color:#aaa">Message:</strong></p>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
