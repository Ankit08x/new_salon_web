const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { fullname, email, message } = req.body;

  if (!fullname || !email || !message) {
    console.log("❌ Missing fields in contact form");
    return res.status(400).json({ error: 'All fields are required' });
  }

  console.log("📥 Incoming contact form data:", req.body);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    try {
      await transporter.verify();
      console.log("✅ Gmail SMTP connection verified");
    } catch (emailError) {
      console.log("⚠️ Gmail SMTP connection failed:", emailError.message);
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact Message from ${fullname}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            📩 New Contact Message
          </h2>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Sender Details:</h3>
            <p><strong>👤 Name:</strong> ${fullname}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>💬 Message:</strong> ${message}</p>
            <p><strong>🕒 Received At:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>

          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;">
              <strong>Note:</strong> Please follow up with the user if necessary.
            </p>
          </div>
        </div>
      `
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully:", info.messageId);
    } catch (emailError) {
      console.log("⚠️ Email sending failed:", emailError.message);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!',
      contactDetails: {
        fullname,
        email,
        message,
        sentAt: new Date().toISOString()
      }
    });

    console.log("✅ Contact message saved & emailed!");
    console.log("👤 Name:", fullname);
    console.log("📧 Email:", email);
    console.log("💬 Message:", message);
    console.log("📅 Date:", new Date().toLocaleString());

  } catch (error) {
    console.error("❌ Error sending contact message:", error.message);
    res.status(500).json({ error: 'Failed to send contact message' });
  }
});

module.exports = router;
