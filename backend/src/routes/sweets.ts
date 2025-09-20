import express from "express";
import Sweet from "../models/Sweet";
import { authMiddleware, adminMiddleware } from "../middleware/auth";

const router = express.Router();

/**
 * POST /api/sweets  (Admin)
 * body: { name, category, price, quantity }
 */
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const payload = req.body;
    const sweet = new Sweet(payload);
    await sweet.save();
    res.status(201).json(sweet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/sweets
 */
router.get("/", async (_req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    res.json(sweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/sweets/search?name=&category=&minPrice=&maxPrice=
 */
router.get("/search", async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const q: any = {};
    if (name) q.name = { $regex: String(name), $options: "i" };
    if (category) q.category = String(category);
    if (minPrice || maxPrice) {
      q.price = {
        ...(minPrice ? { $gte: Number(minPrice) } : {}),
        ...(maxPrice ? { $lte: Number(maxPrice) } : {})
      };
    }

    const sweets = await Sweet.find(q);
    res.json(sweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/sweets/:id  (Admin)
 */
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/sweets/:id  (Admin)
 */
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Sweet.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/sweets/:id/purchase  (Authenticated user)
 * reduces quantity by 1 (fail if out of stock)
 */
router.post("/:id/purchase", authMiddleware, async (req, res) => {
  try {
    const s = await Sweet.findById(req.params.id);
    if (!s) return res.status(404).json({ message: "Sweet not found" });
    if (s.quantity <= 0) return res.status(400).json({ message: "Out of stock" });

    s.quantity -= 1;
    await s.save();
    res.json(s);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/sweets/:id/restock  (Admin)
 * body: { amount?: number } defaults to +1
 */
router.post("/:id/restock", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const amount = Number(req.body.amount ?? 1);
    const s = await Sweet.findById(req.params.id);
    if (!s) return res.status(404).json({ message: "Sweet not found" });

    s.quantity += amount;
    await s.save();
    res.json(s);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
