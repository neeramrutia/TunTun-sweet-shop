"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import Cookies from "js-cookie";
import type { AuthResponse } from "@/types";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: AuthResponse = await login({ email, password });
      Cookies.set("token", data.token, { expires: 1 });
      Cookies.set("role", data.user.role || "user");
      window.location.href = "/dashboard"
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-6 text-center">🔑 Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="📧 Email"
            className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="🔒 Password"
            className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-lg hover:opacity-90">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
