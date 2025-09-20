"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "admin" | "user";
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    const userRole = Cookies.get("role");

    if (!token) {
      router.push("/auth/login");
      return;
    }
    if (role && userRole !== role) {
      router.push("/dashboard");
      return;
    }
    setAllowed(true);
  }, [router, role]);

  if (!allowed) return null;

  return <>{children}</>;
}
