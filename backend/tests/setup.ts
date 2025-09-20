import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../src/app"; // we'll create `app.ts` instead of starting server in index.ts
import request from "supertest";

dotenv.config({ path: ".env" });

beforeAll(async () => {
  const uri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;
  if (!uri) throw new Error("Missing MONGO_URI or MONGO_URI_TEST");

  await mongoose.connect(uri, { dbName: "sweetshop_test" });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

// Utility: register + login admin user
export const getAuthToken = async (isAdmin = false) => {
  const email = `${Math.random()}@test.com`;
  const password = "password123";

  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email,
    password,
    isAdmin,
  });

  const res = await request(app).post("/api/auth/login").send({ email, password });
  return res.body.token as string;
};
