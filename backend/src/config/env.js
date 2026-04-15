const loadEnv = () => {
  if (typeof process.loadEnvFile === "function") {
    process.loadEnvFile();
  }
};

module.exports = { loadEnv };
