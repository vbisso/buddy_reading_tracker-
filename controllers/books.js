const Book = require("../models/books");
//GET all books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
//get book by id
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

//POST a new book
const addBook = async (req, res, next) => {
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
    next(error);
  }
};

//update a book
const updateBook = async (req, res, next) => {
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
    next(error);
  }
};

//delete a book
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
};
