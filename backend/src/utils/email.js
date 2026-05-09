const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME || 'ShopSwift'}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = {
  sendEmail,
};
