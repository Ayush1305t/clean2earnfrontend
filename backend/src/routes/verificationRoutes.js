const express = require("express");
const { verifyCleanup } = require("../controllers/verificationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, verifyCleanup);

module.exports = router;