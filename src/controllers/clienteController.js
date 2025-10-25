const { Op, fn, col, where } = require("sequelize");
const Cliente = require("../models/Cliente");

class ClienteController {
  async index(req, res) {
    try {
      const { cidade, nome, email, status } = req.query;
      const whereClause = {};

      if (nome) {
        whereClause.nome = { [Op.iLike]: `%${nome}%` };
      }

      if (cidade) {
        whereClause.cidade = { [Op.iLike]: `%${cidade}%` };
      }

      if (email) {
        const emailTrim = email.trim();
        if (emailTrim.includes("@")) {
          whereClause.email = where(
            fn("lower", fn("trim", col("email"))),
            Op.eq,
            emailTrim.toLowerCase()
          );
        } else {
          whereClause.email = { [Op.iLike]: `%${email}%` };
        }
      }

      if (status !== undefined) {
        const statusBool = status === "true" || status === true;
        whereClause.status = statusBool;
      }

      const clientes = await Cliente.findAll({
        where: whereClause,
        order: [["id", "ASC"]],
      });

      return res.status(200).json({
        success: true,
        total: clientes.length,
        data: clientes,
      });
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      return res.status(500).json({
        success: false,
        message: "Erro ao listar clientes",
        error: error.message,
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: "Cliente não encontrado",
        });
      }

      return res.status(200).json({
        success: true,
        data: cliente,
      });
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      return res.status(500).json({
        success: false,
        message: "Erro ao buscar cliente",
        error: error.message,
      });
    }
  }

  async store(req, res) {
    try {
      const { nome, email, telefone, cidade } = req.body;
      const rawStatus = req.body.status;
      const normalizedEmail = email.trim().toLowerCase();
      const status =
        rawStatus === undefined
          ? undefined
          : rawStatus === true || rawStatus === "true";

      if (!nome || !email || !telefone || !cidade) {
        return res.status(400).json({
          success: false,
          message: "Todos os campos são obrigatórios",
          campos: ["nome", "email", "telefone", "cidade"],
        });
      }

      const emailExistente = await Cliente.findOne({
        where: where(
          fn("lower", fn("trim", col("email"))),
          Op.eq,
          normalizedEmail
        ),
      });

      if (emailExistente) {
        return res.status(409).json({
          success: false,
          message: "E-mail já cadastrado",
        });
      }

      const novoCliente = await Cliente.create({
        nome,
        email,
        telefone,
        cidade,
        ...(status !== undefined ? { status } : {}),
      });

      return res.status(201).json({
        success: true,
        message: "Cliente criado com sucesso",
        data: novoCliente,
      });
    } catch (error) {
      console.error("Erro ao criar cliente:", error);

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: error.errors.map((e) => ({
            campo: e.path,
            mensagem: e.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Erro ao criar cliente",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, telefone, cidade } = req.body;
      const rawStatus = req.body.status;
      const status =
        rawStatus === undefined
          ? undefined
          : rawStatus === true || rawStatus === "true";

      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: "Cliente não encontrado",
        });
      }

      if (
        email &&
        email.trim().toLowerCase() !==
          (cliente.email ?? "").trim().toLowerCase()
      ) {
        const normalizedEmail = email.trim().toLowerCase();
        const emailExistente = await Cliente.findOne({
          where: where(
            fn("lower", fn("trim", col("email"))),
            Op.eq,
            normalizedEmail
          ),
        });
        if (emailExistente) {
          return res.status(409).json({
            success: false,
            message: "E-mail já cadastrado",
          });
        }
      }

      await cliente.update({
        nome: nome || cliente.nome,
        email: email || cliente.email,
        telefone: telefone || cliente.telefone,
        cidade: cidade || cliente.cidade,
        ...(status !== undefined ? { status } : {}),
      });

      return res.status(200).json({
        success: true,
        message: "Cliente atualizado com sucesso",
        data: cliente,
      });
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          message: "Erro de validação",
          errors: error.errors.map((e) => ({
            campo: e.path,
            mensagem: e.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: "Erro ao atualizar cliente",
        error: error.message,
      });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: "Cliente não encontrado",
        });
      }

      await cliente.destroy();

      return res.status(200).json({
        success: true,
        message: "Cliente excluído com sucesso",
      });
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      return res.status(500).json({
        success: false,
        message: "Erro ao excluir cliente",
        error: error.message,
      });
    }
  }
}

module.exports = new ClienteController();
