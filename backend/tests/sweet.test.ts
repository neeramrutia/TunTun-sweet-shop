import request from "supertest";
import app from "../src/app";
import { getAuthToken } from "./setup";

describe("Sweets API", () => {
  let adminToken: string;
  let userToken: string;
  let sweetId: string;

  beforeAll(async () => {
    adminToken = await getAuthToken(true);
    userToken = await getAuthToken(false);
  });

  it("should allow admin to create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Ladoo", category: "Traditional", price: 10, quantity: 5 });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Ladoo");
    sweetId = res.body._id;
  });

  it("should get all sweets", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should purchase a sweet (quantity decreases)", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(4);
  });

  it("should restock a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 3 });
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(7);
  });
});
