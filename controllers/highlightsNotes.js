const highlightsNotes = require("../models/highlightsNotes");
//get all highlights notes
const getAllHighlightsNotes = async (req, res, next) => {
  try {
    const notes = await highlightsNotes.find().populate("bookId");
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

//get highlight note by id
const getHighlightNoteById = async (req, res, next) => {
  try {
    const highlightNote = await highlightsNotes
      .findById(req.params.id)
      .populate("bookId");
    res.status(200).json(highlightNote);
  } catch (error) {
    next(error);
  }
};
//POST new book
const addHighlightNote = async (req, res, next) => {
  try {
    const {
      userId, //replace later with req.user.id after authentication
      bookId,
      pageNumber,
      noteType,
      content,
    } = req.body;
    const highlightNote = await highlightsNotes.create({
      userId,
      bookId,
      pageNumber,
      noteType,
      content,
    });
    res.status(201).json(highlightNote);
  } catch (error) {
    next(error);
  }
};
//PUT
const updateHighlightNote = async (req, res, next) => {
  try {
    const {
      userId, //replace later with req.user.id after authentication
      bookId,
      pageNumber,
      noteType,
      content,
    } = req.body;
    const updatedHighlightNote = await highlightsNotes.findByIdAndUpdate(
      req.params.id,
      {
        userId,
        bookId,
        pageNumber,
        noteType,
        content,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedHighlightNote);
  } catch (error) {
    next(error);
  }
};
//DELETE
const deleteHighlightNote = async (req, res, next) => {
  try {
    const highlightNote = await highlightsNotes.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(highlightNote);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHighlightsNotes,
  getHighlightNoteById,
  addHighlightNote,
  updateHighlightNote,
  deleteHighlightNote,
};
