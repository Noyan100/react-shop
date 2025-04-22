import api from "./api";
import { User } from "../models/User";

interface RegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

interface VerifyEmailResponse {
  message: string;
}

export const register = async (
  email: string,
  password: string,
  username?: string
): Promise<RegisterResponse> => {
  const response = await api.post("/auth/register", {
    email,
    password,
    username,
  });
  return response.data;
};

export const verifyEmail = async (
  token: string
): Promise<VerifyEmailResponse> => {
  const response = await api.get(`/auth/verify-email/${token}`);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("token");
};
