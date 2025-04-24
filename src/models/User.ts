export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface User {
  id: string;
  email: string;
  username?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
