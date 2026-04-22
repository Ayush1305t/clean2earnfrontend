const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const { app, port } = require("./src/app");
const connectDB = require("./src/config/db");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, '0.0.0.0',() => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
