const express = require("express");
const { verifyCleaning } = require("../controllers/verificationController");

const router = express.Router();

router.post("/verify-cleaning", verifyCleaning);

module.exports = router;
