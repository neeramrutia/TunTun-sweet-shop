import request from "supertest";
import app from "../src/app";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Alice",
        email: `alice${Date.now()}@test.com`,
        password: "password123",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/registered/i);
  });

  it("should login and return token", async () => {
    const email = `bob${Date.now()}@test.com`;

    await request(app).post("/api/auth/register").send({
      name: "Bob",
      email,
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email,
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
