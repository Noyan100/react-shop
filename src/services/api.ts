import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const response = await api.post("/auth/change-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export default api;
