const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Cliente = sequelize.define(
  "Cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nome não pode ser vazio",
        },
        len: {
          args: [3, 100],
          msg: "Nome deve ter entre 3 e 100 caracteres",
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: "Este e-mail já está cadastrado",
      },
      validate: {
        notEmpty: {
          msg: "E-mail não pode ser vazio",
        },
        isEmail: {
          msg: "E-mail inválido",
        },
      },
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Telefone não pode ser vazio",
        },
        is: {
          args: /^[0-9]{10,11}$/,
          msg: "Telefone deve conter apenas números (10 ou 11 dígitos)",
        },
      },
    },
    cidade: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Cidade não pode ser vazia",
        },
      },
    },
  },
  {
    tableName: "clientes",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Cliente;
