import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection
transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});

export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<void> => {
  try {
    if (!process.env.FRONTEND_URL) {
      throw new Error("FRONTEND_URL is not defined in environment variables");
    }

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    console.log("Sending verification email to:", email);
    console.log("Verification URL:", verificationUrl);

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Verify your email",
      html: `
        <h1>Welcome to our shop!</h1>
        <p>Please click the following link to verify your email:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>If you did not create an account, please ignore this email.</p>
      `,
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};
