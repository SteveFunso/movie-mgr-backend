import request from "supertest";
import { expect } from "chai";
import app from "../index";
import db from "../models";

describe("User API", () => {
  before(async () => {
    await db.sequelize.sync({ force: true });
  });

  describe("POST /api/users/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/users/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property(
        "message",
        "User registered successfully"
      );
    });
  });

  describe("POST /api/users/login", () => {
    it("should login an existing user", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "test@example.com",
        password: "password123",
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Login successful");
      expect(res.body).to.have.property("token");
    });
  });

  describe("GET /api/users/profile", () => {
    let token;

    before(async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "test@example.com",
        password: "password123",
      });
      token = res.body.token;
    });

    it("should get the user profile", async () => {
      const res = await request(app)
        .get("/api/users/profile")
        .set("Authorization", token);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("user");
      expect(res.body.user).to.have.property("email", "test@example.com");
    });
  });
});
