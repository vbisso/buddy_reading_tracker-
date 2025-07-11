const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const usersRoutes = require("../routes/users");
const User = require("../models/users");

// Mock authenticate middleware
jest.mock("../middleware/authenticate", () => (req, res, next) => next());

const app = express();
app.use(express.json());
app.use("/users", usersRoutes);

let testUserId;

beforeAll(async () => {
  const uri = process.env.MONGO_URL;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  const user = await User.create({
    username: "test",
    password: "test",
    email: "test@example.com",
    friends: [],
  });
  testUserId = user._id.toString();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Users Routes (with auth mocked)", () => {
  it("should return all users on /users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
  });

  it("should create a new user on /users", async () => {
    const res = await request(app).post("/users").send({
      username: "another",
      password: "Password1!",
      email: "test@gmail.com",
      friends: [],
    });
    expect(res.statusCode).toBe(201);
  });

  it("should return user by id on /users/:id", async () => {
    const res = await request(app).get(`/users/${testUserId}`);
    expect(res.statusCode).toBe(200);
  });

  it("should delete a user by id on /users/:id", async () => {
    const res = await request(app).delete(`/users/${testUserId}`);
    expect(res.statusCode).toBe(200);
  });

  it("should update a user by id on /users/:id", async () => {
    const res = await request(app).put(`/users/${testUserId}`).send({
      username: "anothertest",
      password: "Password1!",
      email: "test@gmail.com",
    });
    expect(res.statusCode).toBe(200);
  });
});
