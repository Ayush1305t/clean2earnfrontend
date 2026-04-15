const express = require("express");
const cors=require("cors")
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const verificationRoutes = require("./routes/verificationRoutes");  
const preRegisterRoute=require("./routes/preRegisterRoute")
const app = express(); 
const port = process.env.PORT || 3001;
app.use(cors({
  origin: "http://localhost:5173", // React app URL
   
}));
app.use(express.json({ limit: "25mb" }));

app.use("/api", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", verificationRoutes);
app.use("/api", preRegisterRoute);
module.exports = { app, port };
