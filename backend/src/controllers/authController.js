const { authenticateUser } = require("../services/authService");
const { createSuccessResponse } = require("../utils/apiResponse");
const { registerUser } = require("../services/authService");

const register = async (req, res) => {
  try {
    const user = registerUser(req.body);

    return res.status(201).json(
      createSuccessResponse(201, "User registered successfully", {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      })
    );
  } catch (error) {
    const status = error.statusCode || 500;

    return res.status(status).json({
      timestamp: new Date().toISOString(),
      status,
      message: error.message || "Registration failed",
      data: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = authenticateUser(req.body);

    return res.status(200).json(
      createSuccessResponse(200, "Login successful", {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      })
    );
  } catch (error) {
    const status = error.statusCode || 500;

    return res.status(status).json({
      timestamp: new Date().toISOString(),
      status,
      message: error.message || "Login failed",
      data: null,
    });
  }
};

module.exports = { register, login };
