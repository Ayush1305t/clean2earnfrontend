const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const preRegisterRoutes = require("./routes/preRegisterRoute");
const healthRoutes = require("./routes/healthRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");




const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/verify-cleaning", verificationRoutes);
app.use("/api/pre-register", preRegisterRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = { app, port };