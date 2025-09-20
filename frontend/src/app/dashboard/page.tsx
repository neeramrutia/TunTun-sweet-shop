"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const userRole = Cookies.get("role");
    if (!token) router.push("/auth/login");
    setRole(userRole || "user");
  }, [router]);

  return (
    <div className="text-center mt-16">
      <h1 className="text-4xl font-bold">👋 Welcome to your Dashboard</h1>
      {role === "admin" ? (
        <p className="mt-4 text-lg">🛠 You are logged in as <b>Admin</b>. Head to <a href="/admin" className="text-pink-500 underline">Admin Panel</a> to manage sweets.</p>
      ) : (
        <p className="mt-4 text-lg">🍭 You are logged in as a <b>User</b>. Explore and buy sweets <a href="/sweets" className="text-pink-500 underline">here</a>.</p>
      )}
    </div>
  );
}
