const express = require("express");
const router = express.Router();
const { getDashboard, claimDailyMission } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getDashboard);
router.post("/claim", authMiddleware, claimDailyMission);

module.exports = router;
