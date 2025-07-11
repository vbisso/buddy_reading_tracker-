const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const readingProgressRoutes = require("../routes/readingProgress");
const ReadingProgress = require("../models/readingProgress");
const Book = require("../models/books");

let testBookID;
let testReadingProgressId;

jest.mock("../middleware/authenticate", () => (req, res, next) => next());

const app = express();
app.use(express.json());
app.use("/readingprogress", readingProgressRoutes);

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
    author: "Author Name",
    isbn: "0000000000",
    genre: "Test Genre",
    totalPages: 200,
    description: "Test Description",
    publishedDate: "2022-01-01",
  });
  testBookID = book._id;
  await ReadingProgress.create({
    userId: "test",
    bookId: testBookID,
    currentPage: 1,
    percentageComplete: 50,
  });
  const progress = await ReadingProgress.findOne({});
  testReadingProgressId = progress._id;
});

afterEach(async () => {
  await ReadingProgress.deleteMany({});
  await Book.deleteMany({});
});

describe("Reading Progress Routes", () => {
  it("should return all reading progress on /readingprogress", async () => {
    const res = await request(app).get("/readingprogress");
    // console.error(res.body);
    expect(res.statusCode).toBe(200);
  });
  it("should create a new reading progress on /readingprogress", async () => {
    const res = await request(app).post("/readingprogress").send({
      userId: "test 2",
      bookId: testBookID,
      currentPage: 180,
      percentageComplete: 80,
    });
    expect(res.statusCode).toBe(201);
  });
  it("should return reading progress by id on /readingprogress/:id", async () => {
    const res = await request(app).get(
      `/readingprogress/${testReadingProgressId}`
    );
    // console.error(res.body);
    expect(res.statusCode).toBe(200);
  });
  it("should update a reading progress by id on /readingprogress/:id", async () => {
    const res = await request(app)
      .put(`/readingprogress/${testReadingProgressId}`)
      .send({
        userId: "test 3",
        bookId: testBookID,
        currentPage: 200,
        percentageComplete: 100,
      });
    expect(res.statusCode).toBe(200);
  });
  it("should delete a reading progress by id on /readingprogress/:id", async () => {
    const res = await request(app).delete(
      `/readingprogress/${testReadingProgressId}`
    );
    expect(res.statusCode).toBe(200);
  });
});
