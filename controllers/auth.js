const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const userData = await User.create({ ...req.body });
  const token = jwt.sign(
    { userId: userData._id, name: userData.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: userData.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const userData = await User.findOne({ email });
  if (!userData) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await userData.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(
      "Invalid Credentials: Password does not match"
    );
  }

  const token = jwt.sign(
    { userId: userData._id, name: userData.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: userData.name }, token });
};

module.exports = {
  register,
  login,
};
