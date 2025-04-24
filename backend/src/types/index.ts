import { UserRole } from "../models/User";

export interface CustomUser {
  id: number;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomUser;
    }
  }
}
