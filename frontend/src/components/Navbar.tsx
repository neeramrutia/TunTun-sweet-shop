"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);

    // Load preference
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-pink-600 dark:text-pink-400">
          🍬 TunTun Sweet Shop
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/sweets" className="hover:text-pink-500 dark:hover:text-pink-400">Sweets</Link>

          {isLoggedIn ? (
            <button onClick={() => { Cookies.remove("token"); Cookies.remove("role"); window.location.href = "/"; }}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">
              Logout
            </button>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-pink-500 dark:hover:text-pink-400">Login</Link>
              <Link href="/auth/register" className="hover:text-pink-500 dark:hover:text-pink-400">Register</Link>
            </>
          )}

          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:opacity-80"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
    </nav>
  );
}
