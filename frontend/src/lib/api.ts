import axios from "axios";
import type { AuthResponse, Sweet } from "@/types";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

export const login = async (
  data: { email: string; password: string }
): Promise<AuthResponse> => {
  console.log(data)
  const res = await API.post<AuthResponse>("/auth/login", data);
  console.log("data : " , res.data)
  return res.data;
};

export const register = async (
  data: { name: string; email: string; password: string }
): Promise<AuthResponse> => {
  const res = await API.post<AuthResponse>("/auth/register", data);
  return res.data;
};


export const getSweets = async (): Promise<Sweet[]> => {
  const res = await API.get<Sweet[]>("/sweets");
  console.log("data : " ,res.data)
  return res.data;
};


export const updateSweet = async (
  id: string,
  data: { name?: string; price?: number; quantity?: number }
): Promise<Sweet> => {
  const token = Cookies.get("token"); // get token from cookie
  if (!token) throw new Error("No auth token found");

  const res = await API.put<Sweet>(`/sweets/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`, // send token in header
    },
  });
  return res.data;
};


export const createSweet = async (
  data: { name: string; price: number; quantity: number }
): Promise<Sweet> => {
  const token = Cookies.get("token"); // get token from cookie
  if (!token) throw new Error("No auth token found");

  const res = await API.post<Sweet>("/sweets", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Delete a sweet by ID
export const deleteSweet = async (id: string): Promise<{ message: string }> => {
  const token = Cookies.get("token");
  if (!token) throw new Error("No auth token found");

  const res = await API.delete<{ message: string }>(`/sweets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};