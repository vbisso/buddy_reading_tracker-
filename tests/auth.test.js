process.env.GOOGLE_CLIENT_ID = "fake-client-id";
process.env.GOOGLE_CLIENT_SECRET = "fake-secret";

const request = require("supertest");
const express = require("express");
const passport = require("passport");

jest.mock("passport", () => ({
  use: jest.fn(),
  authenticate: (strategy, options) => (req, res, next) => {
    req.user = {
      token: "mocked-token",
      user: { id: "123", email: "test@example.com" },
    };
    next();
  },
  initialize: () => (req, res, next) => next(),
  session: () => (req, res, next) => next(),
}));

const authRoutes = require("../routes/auth");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

describe("Auth Routes", () => {
  it("should return token and user on /auth/google/callback", async () => {
    const res = await request(app).get("/auth/google/callback");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token", "mocked-token");
    expect(res.body.user).toHaveProperty("email", "test@example.com");
  });
});
