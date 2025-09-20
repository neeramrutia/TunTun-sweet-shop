"use client";

import { useEffect, useState } from "react";
import { getSweets } from "@/lib/api";
import SweetCard from "@/components/SweetCard";
import type { Sweet } from "@/types";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function SweetsPage() {
  const [sweets, setSweets] = useState<Sweet[]>([]);

  useEffect(() => {
    getSweets().then(setSweets);
  }, []);

  return (
    <ProtectedRoute role="user">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center">🍭 Our Premium Sweets</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sweets.map((sweet) => (
            <SweetCard key={sweet._id} sweet={sweet} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
