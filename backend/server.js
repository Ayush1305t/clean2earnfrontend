const { loadEnv } = require("./src/config/env");
const { app, port } = require("./src/app");
const connectdb=require("./src/config/db");

loadEnv();
connectdb();

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
