const express = require("express");
const router = express.Router();
const { joinBeta } = require("../controllers/preRegistrationController");

router.post("/", joinBeta);

module.exports = router;