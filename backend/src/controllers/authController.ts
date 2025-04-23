import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import {
  generateVerificationToken,
  sendVerificationEmail,
} from "../services/emailService";
import sequelize from "../config/database";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/emailService";

const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "30d",
  });
};

export const register = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    const { email, password, username } = req.body;

    // Validate required fields
    if (!email || !password) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email },
      transaction,
    });

    if (existingUser) {
      await transaction.rollback();
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Create new user
    const user = await User.create(
      {
        email,
        password,
        username: username || email.split("@")[0],
        verificationToken,
        isVerified: false,
      },
      { transaction }
    );

    if (!user.id) {
      await transaction.rollback();
      throw new Error("Failed to create user");
    }

    try {
      // Send verification email
      await sendVerificationEmail(email, verificationToken);
      // If email sent successfully, commit the transaction
      await transaction.commit();
    } catch (emailError: any) {
      // If email sending fails, rollback the transaction
      await transaction.rollback();
      console.error("Email sending error:", emailError);
      return res.status(500).json({
        message: "Failed to send verification email",
        error: emailError.message,
      });
    }

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
    // If any other error occurs, rollback the transaction
    await transaction.rollback();
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ where: { verificationToken: token } });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    await user.update({
      isVerified: true,
      verificationToken: null,
    });

    res.json({ message: "Email verified successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email first" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.id) {
      throw new Error("User ID is missing");
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "User ID is missing" });
    }

    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new passwords are required" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log("Processing forgot password request for email:", email);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" }
    );

    // Save reset token to user
    user.resetPasswordToken = resetToken;
    await user.save();

    // Send email with reset link
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    try {
      console.log("Attempting to send reset password email to:", email);
      console.log("Reset URL:", resetUrl);

      await sendEmail({
        to: email,
        subject: "Восстановление пароля - Техно Строй",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #b58269;">Восстановление пароля</h1>
            <p>Здравствуйте,</p>
            <p>Мы получили запрос на восстановление пароля для вашей учетной записи.</p>
            <p>Для восстановления пароля, пожалуйста, перейдите по следующей ссылке:</p>
            <p style="margin: 20px 0;">
              <a href="${resetUrl}" style="background-color: #b58269; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
                Восстановить пароль
              </a>
            </p>
            <p>Если вы не запрашивали восстановление пароля, проигнорируйте это письмо.</p>
            <p>Ссылка действительна в течение 1 часа.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">Это автоматическое письмо, пожалуйста, не отвечайте на него.</p>
          </div>
        `,
      });

      console.log("Reset password email sent successfully to:", email);
      res.json({
        message: "Инструкции по восстановлению пароля отправлены на вашу почту",
      });
    } catch (emailError) {
      console.error("Email sending error in forgotPassword:", emailError);
      // Return a more specific error message
      res.status(500).json({
        message: "Ошибка при отправке письма. Пожалуйста, попробуйте позже.",
        error:
          emailError instanceof Error ? emailError.message : "Unknown error",
      });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      message: "Ошибка при обработке запроса",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Токен не предоставлен" });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { userId: number };

    const user = await User.findOne({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (user.resetPasswordToken !== token) {
      return res.status(400).json({ message: "Недействительный токен" });
    }

    // Update password and clear reset token
    user.password = password;
    user.resetPasswordToken = null;
    await user.save();

    res.json({ message: "Пароль успешно изменен" });
  } catch (error) {
    console.error("Reset password error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(400)
        .json({ message: "Недействительный или истекший токен" });
    }
    res.status(500).json({ message: "Ошибка при смене пароля" });
  }
};
