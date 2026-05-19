import { getEnv } from "@/env";
import axios from "axios";

const { API_URL } = getEnv();
const AUTH_API_URL = `${API_URL}identity-m/auth/`;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}client/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};