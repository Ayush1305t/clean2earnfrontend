const express = require("express");
const { getHealth } = require("../controllers/verificationController");

const router = express.Router();

router.get("/health", getHealth);

module.exports = router;
