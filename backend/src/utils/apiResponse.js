const createSuccessResponse = (status, message, data = {}) => ({
  timestamp: new Date().toISOString(),
  status,
  message,
  data,
});

module.exports = { createSuccessResponse };
