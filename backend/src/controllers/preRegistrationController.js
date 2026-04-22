const PreRegister = require("../models/preRegister");

exports.joinBeta = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        message: "First name, last name and email are required",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const exists = await PreRegister.findOne({ email: normalizedEmail });

    if (exists) {
      return res.status(400).json({
        message: "Already registered with this email",
      });
    }

    const user = await PreRegister.create({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: normalizedEmail,
      phone: phone ? String(phone).trim() : "",
      message: message ? String(message).trim() : "",
    });

    return res.status(201).json({
      message: "Joined Beta Successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
