const Book = require("../models/books");
//GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//get book by id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//POST a new book
const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      genre,
      totalPages,
      description,
      publishedDate,
    } = req.body;

    const book = await Book.create({
      title,
      author,
      isbn,
      genre,
      totalPages,
      description,
      publishedDate,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update a book
const updateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      genre,
      totalPages,
      description,
      publishedDate,
    } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        isbn,
        genre,
        totalPages,
        description,
        publishedDate,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete a book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
};
