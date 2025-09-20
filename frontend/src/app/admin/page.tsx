"use client";

import { useEffect, useState } from "react";
import { getSweets, updateSweet, deleteSweet, createSweet } from "@/lib/api";
import type { Sweet } from "@/types";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function SweetManager() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ name: string; price: number; quantity: number }>({
    name: "",
    price: 0,
    quantity: 0,
  });
  const [newSweet, setNewSweet] = useState({ name: "", price: 0, quantity: 0 });

  const fetchSweets = async () => {
    const data = await getSweets();
    setSweets(data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const startEdit = (sweet: Sweet) => {
    setEditingId(sweet._id);
    setEditData({ name: sweet.name, price: sweet.price, quantity: sweet.quantity });
  };

  const saveEdit = async (id: string) => {
    const updated = await updateSweet(id, editData);
    setSweets(sweets.map((s) => (s._id === id ? updated : s)));
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sweet?")) return;
    await deleteSweet(id);
    setSweets(sweets.filter((s) => s._id !== id));
  };

  const handleCreate = async () => {
    if (!newSweet.name || newSweet.price <= 0 || newSweet.quantity <= 0) {
      alert("Please enter valid data");
      return;
    }
    const created = await createSweet(newSweet);
    setSweets([...sweets, created]);
    setNewSweet({ name: "", price: 0, quantity: 0 });
  };

  return (
    <ProtectedRoute role="admin">
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-center">Sweet Manager 🍬</h1>

      {/* Create Sweet */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded shadow-sm w-full md:w-48 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          value={newSweet.name}
          onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded shadow-sm w-full md:w-32 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          value={newSweet.price}
          onChange={(e) => setNewSweet({ ...newSweet, price: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 rounded shadow-sm w-full md:w-32 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          value={newSweet.quantity}
          onChange={(e) => setNewSweet({ ...newSweet, quantity: Number(e.target.value) })}
        />
        <button
          className="bg-green-500 dark:bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 shadow transition-colors"
          onClick={handleCreate}
        >
          Create Sweet
        </button>
      </div>

      {/* Sweet List */}
      <div className="grid gap-4">
        {sweets.map((sweet) => (
          <div
            key={sweet._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:flex-1">
              {/* Name */}
              <div className="flex-1">
                {editingId === sweet._id ? (
                  <input
                    type="text"
                    value={editData.name}
                    className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-1 rounded w-full text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                ) : (
                  <p className="text-lg font-medium">{sweet.name}</p>
                )}
              </div>

              {/* Price */}
              <div className="flex-1">
                {editingId === sweet._id ? (
                  <input
                    type="number"
                    value={editData.price}
                    className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-1 rounded w-full text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
                    onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                  />
                ) : (
                  <p>Price: ₹{sweet.price}</p>
                )}
              </div>

              {/* Quantity */}
              <div className="flex-1">
                {editingId === sweet._id ? (
                  <input
                    type="number"
                    value={editData.quantity}
                    className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-1 rounded w-full text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
                    onChange={(e) =>
                      setEditData({ ...editData, quantity: Number(e.target.value) })
                    }
                  />
                ) : (
                  <p>Quantity: {sweet.quantity}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3 md:mt-0">
              {editingId === sweet._id ? (
                <>
                  <button
                    className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                    onClick={() => saveEdit(sweet._id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-400 dark:bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-500 dark:hover:bg-gray-700 transition-colors"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-yellow-400 dark:bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors"
                    onClick={() => startEdit(sweet)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 dark:bg-red-600 text-white px-4 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
                    onClick={() => handleDelete(sweet._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </ProtectedRoute>
  );
}
