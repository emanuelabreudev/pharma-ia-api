const { DataTypes } = require("sequelize");
const database = require("../config/database");

const Cliente = database.getSequelize().define(
  "Cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "ID único do cliente",
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "Nome completo do cliente",
      validate: {
        notEmpty: { msg: "Nome não pode ser vazio" },
        len: {
          args: [3, 100],
          msg: "Nome deve ter entre 3 e 100 caracteres",
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { msg: "Este e-mail já está cadastrado" },
      comment: "E-mail do cliente",
      validate: {
        notEmpty: { msg: "E-mail não pode ser vazio" },
        isEmail: { msg: "E-mail inválido" },
      },
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "Telefone do cliente",
      validate: {
        notEmpty: { msg: "Telefone não pode ser vazio" },
        is: {
          args: /^[0-9]{10,11}$/,
          msg: "Telefone deve conter 10 ou 11 dígitos numéricos",
        },
      },
    },
    cidade: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "Cidade do cliente",
      validate: {
        notEmpty: { msg: "Cidade não pode ser vazia" },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Status ativo/inativo do cliente",
      validate: {
        isBoolean(value) {
          if (typeof value !== "boolean") {
            throw new Error("Status deve ser booleano");
          }
        },
      },
    },
  },
  {
    tableName: "clientes",
    indexes: [
      { fields: ["email"] },
      { fields: ["cidade"] },
      { fields: ["status"] },
    ],
  }
);

module.exports = Cliente;
