import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

/**
 * POST /api/auth/register
 * body: { name, email, password, isAdmin? }
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body as {
      name: string;
      email: string;
      password: string;
      isAdmin?: boolean;
    };

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, isAdmin: false });
    await user.save();

    return res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/auth/login
 * body: { email, password }
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) return res.status(400).json({ message: "email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET not set");
      return res.status(500).json({ message: "Server misconfigured" });
    }

    const token = jwt.sign({ id: user._id.toString(), isAdmin: user.isAdmin }, secret, {
      expiresIn: "1d"
    });

    return res.json({ token , user:{
      name: user.name,
      email: user.email,
      role: user.isAdmin ? "admin" : "user"} });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
