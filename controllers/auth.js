const { BadRequestError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide name, email and password");
  }

  const userData = await User.create({ ...req.body });
  const token = jwt.sign(
    { userId: userData._id, name: userData.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  res.status(StatusCodes.CREATED).json({ user: { name: userData.name }, token });
};

const login = async (req, res) => {
  res.status(200).json({ msg: "Login endpoint" });
};

module.exports = {
  register,
  login,
};
