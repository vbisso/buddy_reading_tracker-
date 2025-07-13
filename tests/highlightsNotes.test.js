const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const highlightsNotesRoutes = require("../routes/highlightsNotes");
const HighlightNote = require("../models/highlightsNotes");
const Book = require("../models/books");

let testBookId;
let testHighlightNoteId;
// Mock authenticate middleware
jest.mock("../middleware/authenticate", () => (req, res, next) => next());
const app = express();
app.use(express.json());
app.use("/highlightsNotes", highlightsNotesRoutes);

beforeAll(async () => {
  const uri = process.env.MONGO_URL;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  //because the highlight note is created on book creation and uses it as reference
  const book = await Book.create({
    title: "Test Book",
    author: "Author Name",
    isbn: "1111111111",
    genre: "Test Genre",
    totalPages: 200,
    description: "Test Description",
    publishedDate: "2022-01-01",
  });
  testBookId = book._id;
  await HighlightNote.create({
    userId: "test",
    bookId: testBookId,
    pageNumber: 10,
    noteType: "test",
    content: "test",
  });
  const highlightNote = await HighlightNote.findOne({});
  testHighlightNoteId = highlightNote._id;
});
afterEach(async () => {
  await HighlightNote.deleteMany({});
  await Book.deleteMany({});
});

describe("Highlights Notes Routes", () => {
  it("should return all highlights notes on /highlightsNotes", async () => {
    const res = await request(app).get("/highlightsNotes");
    // console.error(res.body);
    expect(res.statusCode).toBe(200);
  });
  it("should create a new highlight note on /highlightsNotes", async () => {
    const res = await request(app).post("/highlightsNotes").send({
      userId: "test 1",
      bookId: testBookId.toString(),
      pageNumber: 20,
      noteType: "test 1",
      content: "test 1",
    });
    expect(res.statusCode).toBe(201);
  });
  it("should return highlight note by id on /highlightsNotes/:id", async () => {
    const res = await request(app).get(
      `/highlightsNotes/${testHighlightNoteId}`
    );
    // console.error(res.body);
    expect(res.statusCode).toBe(200);
  });
  it("should delete a highlight note by id on /highlightsNotes/:id", async () => {
    const res = await request(app).delete(
      `/highlightsNotes/${testHighlightNoteId}`
    );
    expect(res.statusCode).toBe(200);
  });
  it("should update a highlight note by id on /highlightsNotes/:id", async () => {
    const res = await request(app)
      .put(`/highlightsNotes/${testHighlightNoteId}`)
      .send({
        userId: "test 2",
        bookId: testBookId,
        pageNumber: 49,
        noteType: "test 2",
        content: "test 2",
      });
    expect(res.statusCode).toBe(200);
  });
});
