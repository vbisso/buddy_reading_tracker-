const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const booksRoutes = require("../routes/books");
const Book = require("../models/books");

// Mock authenticate middleware
jest.mock("../middleware/authenticate", () => (req, res, next) => next());

const app = express();
app.use(express.json());
app.use("/books", booksRoutes);

let testBookId;

beforeAll(async () => {
  const uri = process.env.MONGO_URL;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  const book = await Book.create({
    title: "Test Book",
    author: "Test Author",
    isbn: "1234567890",
    genre: "Test Genre",
    totalPages: 100,
    description: "Test Description",
    publishedDate: "2022-01-01",
  });
  testBookId = book._id.toString();
});

afterEach(async () => {
  await Book.deleteMany({});
});

describe("Books Routes", () => {
  it("should return all books on /books", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toBe(200);
  });

  it("should create a new book on /books", async () => {
    const res = await request(app).post("/books").send({
      title: "Test Book 2",
      author: "Test Author 2 ",
      isbn: "12345670090",
      genre: "Test Genre 2",
      totalPages: 200,
      description: "Test Description 2",
      publishedDate: "2022-01-01",
    });
    expect(res.statusCode).toBe(201);
  });

  it("should return book by id on /books/:id", async () => {
    const res = await request(app).get(`/books/${testBookId}`);
    expect(res.statusCode).toBe(200);
  });

  it("should delete a book by id on /books/:id", async () => {
    const res = await request(app).delete(`/books/${testBookId}`);
    expect(res.statusCode).toBe(200);
  });

  it("should update a book by id on /books/:id", async () => {
    const res = await request(app).put(`/books/${testBookId}`).send({
      title: "Test Book 2!!",
      author: "Test Author 2!! ",
      isbn: "12345670090",
      genre: "Test Genre 2!!",
      totalPages: 200,
      description: "Test Description 2!!",
      publishedDate: "2022-01-01",
    });
    expect(res.statusCode).toBe(200);
  });
});
