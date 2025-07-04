const readingProgress = require("../models/readingProgress");
const getAllReadingProgress = async (req, res) => {
  try {
    const progress = await readingProgress.find().populate("bookId");
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getReadingProgressById = async (req, res) => {
  try {
    const progress = await readingProgress
      .findById(req.params.id)
      .populate("bookId");
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addReadingProgress = async (req, res) => {
  try {
    const {
      userId, //replace later with req.user.id after authentication
      bookId,
      currentPage,
      percentageComplete,
    } = req.body;
    const progress = await readingProgress.create({
      userId,
      bookId: bookId,
      currentPage,
      percentageComplete,
    });
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateReadingProgress = async (req, res) => {
  try {
    const {
      userId, //replace later with req.user.id after authentication
      bookId,
      currentPage,
      percentageComplete,
    } = req.body;
    const progress = await readingProgress.findByIdAndUpdate(
      req.params.id,
      {
        userId,
        bookId: bookId,
        currentPage,
        percentageComplete,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReadingProgress = async (req, res) => {
  try {
    const progress = await readingProgress.findByIdAndDelete(req.params.id);
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReadingProgress,
  getReadingProgressById,
  addReadingProgress,
  updateReadingProgress,
  deleteReadingProgress,
};
