import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Validate environment variables
const requiredEnvVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify SMTP connection
transporter.verify((error) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
  try {
    console.log("Attempting to send email to:", to);
    console.log("Using SMTP server:", process.env.SMTP_HOST);
    console.log("From email:", process.env.SMTP_FROM);

    const info = await transporter.sendMail({
      from: `"Техно Строй" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email sending error details:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      to,
      subject,
    });
    throw new Error(
      "Failed to send email. Please check the server configuration."
    );
  }
};

// Email templates
export const emailTemplates = {
  registration: (name: string, verificationUrl: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f8f8f8; padding: 30px; border-radius: 8px; border: 1px solid #e0e0e0;">
        <h1 style="color: #b58269; text-align: center; margin-bottom: 20px;">Добро пожаловать в Техно Строй!</h1>
        <p style="color: #333; font-size: 16px; line-height: 1.5;">Здравствуйте, ${name}!</p>
        <p style="color: #333; font-size: 16px; line-height: 1.5;">Спасибо за регистрацию в нашем магазине. Для завершения регистрации, пожалуйста, подтвердите ваш email, перейдя по ссылке ниже:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #b58269; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; display: inline-block;">
            Подтвердить Email
          </a>
        </div>
        <p style="color: #666; font-size: 14px; line-height: 1.5;">Если вы не регистрировались в нашем магазине, проигнорируйте это письмо.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">Это автоматическое письмо, пожалуйста, не отвечайте на него.</p>
      </div>
    </div>
  `,

  contactForm: (name: string, email: string, message: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f8f8f8; padding: 30px; border-radius: 8px; border: 1px solid #e0e0e0;">
        <h1 style="color: #b58269; text-align: center; margin-bottom: 20px;">Новое сообщение с контактной формы</h1>
        <div style="background-color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
          <p style="color: #333; font-size: 16px; margin-bottom: 10px;"><strong>От:</strong> ${name}</p>
          <p style="color: #333; font-size: 16px; margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
          <p style="color: #333; font-size: 16px; margin-bottom: 10px;"><strong>Сообщение:</strong></p>
          <p style="color: #333; font-size: 16px; line-height: 1.5; white-space: pre-wrap;">${message}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">Это автоматическое письмо, пожалуйста, не отвечайте на него.</p>
      </div>
    </div>
  `,

  contactConfirmation: (name: string, message: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f8f8f8; padding: 30px; border-radius: 8px; border: 1px solid #e0e0e0;">
        <h1 style="color: #b58269; text-align: center; margin-bottom: 20px;">Спасибо за ваше сообщение!</h1>
        <p style="color: #333; font-size: 16px; line-height: 1.5;">Здравствуйте, ${name}!</p>
        <p style="color: #333; font-size: 16px; line-height: 1.5;">Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
        <div style="background-color: white; padding: 20px; border-radius: 4px; margin: 20px 0;">
          <p style="color: #333; font-size: 16px; margin-bottom: 10px;"><strong>Ваше сообщение:</strong></p>
          <p style="color: #333; font-size: 16px; line-height: 1.5; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #333; font-size: 16px; line-height: 1.5;">С уважением,<br>Команда Техно Строй</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">Это автоматическое письмо, пожалуйста, не отвечайте на него.</p>
      </div>
    </div>
  `,
};
