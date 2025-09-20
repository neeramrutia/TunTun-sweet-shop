import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayloadCustom {
  id: string;
  isAdmin?: boolean;
  iat?: number;
  exp?: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization") || req.header("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not set");

    const decoded = jwt.verify(token, secret) as JwtPayloadCustom;
    // attach to req
    (req as any).user = { id: decoded.id, isAdmin: decoded.isAdmin };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!(req as any).user?.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
