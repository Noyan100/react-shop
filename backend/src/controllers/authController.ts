import { Request, Response } from "express";
import User, { UserRole } from "../models/User";
import jwt from "jsonwebtoken";
import {
  generateVerificationToken,
  sendVerificationEmail,
} from "../services/emailService";
import sequelize from "../config/database";
import bcrypt from "bcryptjs";
import { sendEmail, emailTemplates } from "../utils/emailService";
import IpTracking from "../models/IpTracking";

const generateToken = (userId: number, role: UserRole): string => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || "your-secret-key",
    {
      expiresIn: "30d",
    }
  );
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken();
    await user.update({ verificationToken });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res.json({ message: "Verification email has been resent" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    const ipAddress = req.ip || req.socket.remoteAddress || "";

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      if (!existingUser.isVerified) {
        // If user exists but not verified, allow resending verification email
        const verificationToken = generateVerificationToken();
        await existingUser.update({ verificationToken });

        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        await sendEmail({
          to: email,
          subject: "Подтверждение регистрации - Техно Строй",
          html: emailTemplates.registration(username || email, verificationUrl),
        });

        return res.status(200).json({
          message:
            "Письмо с подтверждением отправлено повторно. Пожалуйста, проверьте вашу почту.",
        });
      }
      return res.status(400).json({ message: "Email уже зарегистрирован" });
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Create user - password will be hashed by the model hook
    const user = await User.create({
      email,
      password, // Password will be hashed by the model hook
      username,
      verificationToken,
      isVerified: false,
      role: UserRole.USER, // Use enum value
      ipAddress, // Store IP address
    });

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await sendEmail({
      to: email,
      subject: "Подтверждение регистрации - Техно Строй",
      html: emailTemplates.registration(username || email, verificationUrl),
    });

    res.status(201).json({
      message:
        "Registration successful. Please check your email to verify your account.",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    await user.update({ isVerified: true, verificationToken: null });

    res.json({ message: "Email verified successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip || req.socket.remoteAddress || "";

    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Increment login attempts for failed login
      if (req.ipTracking) {
        await req.ipTracking.increment("loginAttempts");
      }
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      // Increment login attempts for failed login
      if (req.ipTracking) {
        await req.ipTracking.increment("loginAttempts");
      }
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    // Reset login attempts on successful login
    if (req.ipTracking) {
      await req.ipTracking.update({
        loginAttempts: 0,
        isBanned: false,
        banExpiresAt: null,
      });
    }

    // Update user's IP address
    await user.update({ ipAddress });

    const token = generateToken(user.id, user.role);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user?.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user?.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    await user.update({ password: newPassword });

    res.json({ message: "Password changed successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateVerificationToken();
    await user.update({ resetPasswordToken: resetToken });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: "Сброс пароля - Техно Строй",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #b58269;">Сброс пароля</h1>
          <p>Здравствуйте,</p>
          <p>Мы получили запрос на сброс пароля для вашей учетной записи.</p>
          <p>Для сброса пароля, пожалуйста, перейдите по следующей ссылке:</p>
          <p style="margin: 20px 0;">
            <a href="${resetUrl}" style="background-color: #b58269; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
              Сбросить пароль
            </a>
          </p>
          <p>Если вы не запрашивали сброс пароля, проигнорируйте это письмо.</p>
          <p>Ссылка действительна в течение 1 часа.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">Это автоматическое письмо, пожалуйста, не отвечайте на него.</p>
        </div>
      `,
    });

    res.json({ message: "Password reset email sent" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({ where: { resetPasswordToken: token } });

    if (!user) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    await user.update({
      password: newPassword,
      resetPasswordToken: null,
    });

    res.json({ message: "Password reset successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
