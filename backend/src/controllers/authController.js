const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const normalizedName = String(name).trim();
    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedPassword = String(password);

    if (normalizedName.length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters long" });
    }

    if (normalizedPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(normalizedPassword, 10);

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashed,
    });

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        ecoCoins: user.ecoCoins,
        cleanups: user.cleanups,
        impactScore: user.impactScore,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.error("Register error:", error);
    return res.status(500).json({ message: "Unable to register right now. Please try again." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedPassword = String(password);
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatches = await bcrypt.compare(normalizedPassword, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        ecoCoins: user.ecoCoins,
        cleanups: user.cleanups,
        impactScore: user.impactScore,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Unable to login right now. Please try again." });
  }
};
