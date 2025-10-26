const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error("Erro não tratado:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno do servidor";

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
