const User = require("../models/users");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("friends");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("friends");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { username, password, email, friends } = req.body;
    const user = await User.create({
      username,
      password,
      email,
      friends: friends,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { username, password, email, friends } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        password,
        email,
        friends: friends,
      },
      { new: true, runValidators: true }
    ).populate("friends");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
