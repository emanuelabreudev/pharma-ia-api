const { Sequelize } = require("sequelize");
const logger = require("../utils/logger");

class Database {
  constructor() {
    this.sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: process.env.NODE_ENV === "development" ? logger.debug : false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        define: {
          timestamps: true,
          underscored: true,
        },
      }
    );
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      logger.info("✅ Conexão com banco de dados estabelecida");
      return true;
    } catch (error) {
      logger.error("❌ Erro ao conectar com banco de dados:", error.message);
      throw error;
    }
  }

  async syncModels() {
    try {
      await this.sequelize.sync({
        alter: process.env.NODE_ENV === "development",
      });
      logger.info("✅ Modelos sincronizados com sucesso");
    } catch (error) {
      logger.error("❌ Erro ao sincronizar modelos:", error.message);
      throw error;
    }
  }

  getSequelize() {
    return this.sequelize;
  }
}

module.exports = new Database();
