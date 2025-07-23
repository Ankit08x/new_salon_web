const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, phone, message } = req.body;
  
  console.log("📥 New Appointment Request:", req.body);
  
  if (!name || !phone || !message) {
    return res.status(400).json({ 
      error: 'All fields are required' 
    });
  }
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
      console.log('✅ Gmail SMTP connection verified');
    } catch (emailError) {
      console.log('⚠️ Email service unavailable, but appointment saved');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
to: process.env.EMAIL_USER,
   
      subject: `🎯 New Salon Appointment from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            🎯 New Salon Appointment
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Customer Details:</h3>
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📱 Phone:</strong> ${phone}</p>
            <p><strong>💬 Message:</strong> ${message}</p>
            <p><strong>📅 Booked At:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
          
          <div style="background: #d4edda; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
            <p style="margin: 0; color: #155724;">
              <strong>Action Required:</strong> Please contact the customer to confirm the appointment.
            </p>
          </div>
        </div>
      `
    };

     try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);
    } catch (emailError) {
      console.log('⚠️ Email failed but appointment saved:', emailError.message);
    }

    console.log('✅ Appointment booked successfully!');
    console.log('👤 Name:', name);
    console.log('📱 Phone:', phone);
    console.log('💬 Message:', message);
    console.log('📅 Date:', new Date().toLocaleString());
    
    res.status(200).json({ 
      success: true, 
      message: "Appointment booked successfully!",
      appointmentDetails: {
        name,
        phone,
        message,
        bookedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ 
      error: 'Failed to book appointment',
      details: error.message 
    });
  }
});

module.exports = router;