import type { Sweet } from "@/types";

export default function SweetCard({ sweet }: { sweet: Sweet }) {
  return (
    <div className="border rounded-2xl p-6 bg-white/70 dark:bg-gray-800/70 shadow hover:shadow-xl transition backdrop-blur-md">
      <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400">🍬 {sweet.name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{sweet.description}</p>
      <p className="font-semibold mt-2">💰 ₹{sweet.price}</p>
      <p className="text-sm text-gray-500">📦 Stock: {sweet.quantity}</p>
      <button className="mt-4 w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg hover:opacity-90 transition">
        🛒 Buy Now
      </button>
    </div>
  );
}
