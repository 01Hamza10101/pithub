import nodemailer from 'nodemailer';

const emailProvider = process.env.EMAIL_PROVIDER || 'gmail'; // 'gmail' or 'ethereal'

// Configure transporter based on provider
let transporter;

if (emailProvider === 'gmail') {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
} else if (emailProvider === 'ethereal') {
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'maddison53@ethereal.email',
      pass: 'jn7jnAPss4f63QBp6D',
    },
  });
} else {
  throw new Error('Unsupported email provider');
}

// sendMail function
export default async function sendMail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from:
        emailProvider === 'gmail'
          ? `"PitHub" <${process.env.EMAIL_USER}>`
          : '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to,
      subject,
      html,
    });

    console.log('✅ Email sent!');
    console.log('Message ID:', info.messageId);
    console.log('Details:', {
      to,
      subject,
      html,
      provider: emailProvider,
      envelope: info.envelope,
      preview: nodemailer.getTestMessageUrl?.(info) || 'n/a',
    });

    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
}
