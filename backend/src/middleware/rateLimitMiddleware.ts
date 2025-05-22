import { Request, Response, NextFunction } from "express";
import IpTracking from "../models/IpTracking";

const BAN_DURATION_MINUTES = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const MAX_REGISTRATION_ATTEMPTS = 2;

export const checkIpBan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ipAddress = req.ip || req.socket.remoteAddress || "";

    if (!ipAddress) {
      return res
        .status(400)
        .json({ message: "Could not determine IP address" });
    }

    let ipTracking = await IpTracking.findOne({ where: { ipAddress } });

    if (!ipTracking) {
      ipTracking = await IpTracking.create({
        ipAddress,
        loginAttempts: 0,
        registrationAttempts: 0,
        isBanned: false,
        banExpiresAt: null,
      });
    }

    // Check if IP is banned
    if (ipTracking.isBanned) {
      if (ipTracking.banExpiresAt && ipTracking.banExpiresAt > new Date()) {
        const remainingMinutes = Math.ceil(
          (ipTracking.banExpiresAt.getTime() - new Date().getTime()) /
            (1000 * 60)
        );
        return res.status(403).json({
          message: `IP-адрес заблокирован. Пожалуйста, попробуйте снова через ${remainingMinutes} минут.`,
        });
      } else {
        // Ban has expired, reset the tracking
        await ipTracking.update({
          isBanned: false,
          banExpiresAt: null,
          loginAttempts: 0,
          registrationAttempts: 0,
        });
      }
    }

    // Add IP tracking to request for use in controllers
    req.ipTracking = ipTracking;
    next();
  } catch (error) {
    console.error("Error in IP ban check:", error);
    next();
  }
};

export const incrementLoginAttempts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.ipTracking) {
      return next();
    }

    const ipTracking = req.ipTracking;
    await ipTracking.increment("loginAttempts");

    if (ipTracking.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      const banExpiresAt = new Date();
      banExpiresAt.setMinutes(banExpiresAt.getMinutes() + BAN_DURATION_MINUTES);

      await ipTracking.update({
        isBanned: true,
        banExpiresAt,
      });

      return res.status(403).json({
        message: `Слишком много неудачных попыток входа. IP-адрес заблокирован на ${BAN_DURATION_MINUTES} минут.`,
      });
    }

    next();
  } catch (error) {
    console.error("Error in login attempts tracking:", error);
    next();
  }
};

export const incrementRegistrationAttempts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.ipTracking) {
      return next();
    }

    const ipTracking = req.ipTracking;
    await ipTracking.increment("registrationAttempts");

    if (ipTracking.registrationAttempts >= MAX_REGISTRATION_ATTEMPTS) {
      const banExpiresAt = new Date();
      banExpiresAt.setMinutes(banExpiresAt.getMinutes() + BAN_DURATION_MINUTES);

      await ipTracking.update({
        isBanned: true,
        banExpiresAt,
      });

      return res.status(403).json({
        message: `Слишком много попыток регистрации. IP-адрес заблокирован на ${BAN_DURATION_MINUTES} минут.`,
      });
    }

    next();
  } catch (error) {
    console.error("Error in registration attempts tracking:", error);
    next();
  }
};

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      ipTracking?: IpTracking;
    }
  }
}
