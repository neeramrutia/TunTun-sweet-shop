"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";
import Cookies from "js-cookie";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(form);
      router.push("/auth/login");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Error creating account");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-md transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center">📝 Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="👤 Name"
            className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="📧 Email"
            className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="🔒 Password"
            className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 dark:text-pink-400 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
