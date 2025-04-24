import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/User";

interface CustomUser {
  id: string;
  role: UserRole;
}

interface AuthenticatedRequest extends Request {
  user?: CustomUser;
}

export const requireRole = (roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  };
};

export const requireAdmin = requireRole([UserRole.ADMIN]);
export const requireUser = requireRole([UserRole.USER, UserRole.ADMIN]);
