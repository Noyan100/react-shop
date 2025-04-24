import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface CustomUser {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomUser;
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as { id: number };
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user.id.toString(),
      role: user.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export { auth };
