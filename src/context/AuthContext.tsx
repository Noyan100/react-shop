import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../models/User";
import {
  login as apiLogin,
  register as apiRegister,
  getMe,
  logout as apiLogout,
} from "../services/authService";

interface RegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username?: string
  ) => Promise<RegisterResponse>;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  token: null,
  login: async () => {},
  register: async () => ({
    message: "",
    user: { id: 0, email: "", username: "" },
  }),
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await getMe();
          setUser(userData);
        } catch (error) {
          logout();
        }
      }
    };
    loadUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    const { user, token } = await apiLogin(email, password);
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const register = async (
    email: string,
    password: string,
    username?: string
  ): Promise<RegisterResponse> => {
    const response = await apiRegister(email, password, username);
    return response;
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
