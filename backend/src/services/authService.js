const { createUser, findUserByEmail } = require("../models/userModel");

const createAuthError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const authenticateUser = (body = {}) => {
  const email = String(body.email || "").trim();
  const password = String(body.password || "").trim();

  if (!email || !password) {
    throw createAuthError(400, "Email and password are required.");
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    throw createAuthError(401, "Invalid email or password.");
  }

  if (!user.isVerified) {
    throw createAuthError(401, "Email is not verified.");
  }

  return user;
};

const registerUser = (body = {}) => {
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const password = String(body.password || "").trim();

  if (!name || !email || !password) {
    throw createAuthError(400, "Name, email and password are required.");
  }

  if (password.length < 6) {
    throw createAuthError(400, "Password must be at least 6 characters.");
  }

  if (findUserByEmail(email)) {
    throw createAuthError(409, "User already exists with this email.");
  }

  return createUser({
    name,
    email,
    password,
    isVerified: true,
  });
};

module.exports = { authenticateUser, registerUser };
