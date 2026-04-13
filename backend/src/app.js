const express = require("express");
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const verificationRoutes = require("./routes/verificationRoutes");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({ limit: "25mb" }));

app.use("/api", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", verificationRoutes);

module.exports = { app, port };
