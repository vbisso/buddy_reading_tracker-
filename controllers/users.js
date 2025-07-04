const User = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("friends");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("friends");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
