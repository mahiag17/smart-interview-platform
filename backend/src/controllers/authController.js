const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
    .select("+password");

  if (
    user &&
    (await user.comparePassword(password))
  ) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error(
      "Invalid email or password"
    );
  }
});

const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  signup,
  login,
  getMe,
};