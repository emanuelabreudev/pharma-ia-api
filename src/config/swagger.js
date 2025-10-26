const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FarmaUP API - Documentação",
      version: "1.0.0",
      description: "API REST para gerenciamento de clientes da FarmaUP",
      contact: {
        name: "Suporte FarmaUP",
        email: "suporte@farmaup.com",
      },
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Servidor de Desenvolvimento",
      },
      {
        url: "http://localhost:3000",
        description: "Servidor Docker",
      },
    ],
    tags: [
      {
        name: "Clientes",
        description: "Endpoints para gerenciamento de clientes",
      },
    ],
  },
  apis: ["./src/docs/swagger/*.js", "./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
