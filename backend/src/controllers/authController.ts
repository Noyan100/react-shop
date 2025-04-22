import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import {
  generateVerificationToken,
  sendVerificationEmail,
} from "../services/emailService";
import sequelize from "../config/database";

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
