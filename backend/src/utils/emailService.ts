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
