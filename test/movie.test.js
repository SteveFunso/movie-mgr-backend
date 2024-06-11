import request from "supertest";
import { expect } from "chai";
import app from "../index";
import db from "../models";

describe("Movie API", () => {
  before(async () => {
    await db.sequelize.sync({ force: true });
    await db.User.create({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
  });

  describe("POST /api/movies", () => {
    let token;

    before(async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "test@example.com",
        password: "password123",
      });
      token = res.body.token;
    });

    it("should create a new movie", async () => {
      const res = await request(app)
        .post("/api/movies")
        .set("Authorization", token)
        .send({
          name: "Inception",
          description: "A mind-bending thriller",
          releaseDate: "2010-07-16",
          rating: 5,
          ticketPrice: 12.5,
          country: "USA",
          genres: ["Sci-Fi", "Thriller"],
          photo: "inception.jpg",
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("name", "Inception");
    });
  });

  describe("GET /api/movies", () => {
    it("should get all movies", async () => {
      const res = await request(app).get("/api/movies");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("name", "Inception");
    });
  });

  describe("GET /api/movies/:slug", () => {
    it("should get a movie by slug", async () => {
      const res = await request(app).get("/api/movies/inception");
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Inception");
    });
  });
});
