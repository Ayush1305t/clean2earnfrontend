
const mongoose = require("mongoose");

const preRegisterSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    message: String,
}, { timestamps: true });

module.exports = mongoose.model("PreRegister", preRegisterSchema);