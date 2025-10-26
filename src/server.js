const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const database = require("./config/database");
const swaggerSpec = require("./config/swagger");
const clienteRoutes = require("./routes/clienteRoutes");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.SWAGGER_ENABLED === "true") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/api", clienteRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await database.testConnection();
    await database.syncModels();

    app.listen(PORT, () => {
      logger.info(`🚀 Servidor rodando na porta ${PORT}`);
      logger.info(`📍 API: http://localhost:${PORT}/api`);
      logger.info(`📚 Swagger: http://localhost:${PORT}/api-docs`);
      logger.info(`❤️  Health: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error("❌ Erro ao iniciar servidor:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
