const clienteService = require("../services/clienteService");
const ResponseHandler = require("../utils/responseHandler");
const logger = require("../utils/logger");

class ClienteController {
  async index(req, res) {
    try {
      const clientes = await clienteService.findAll(req.query);

      return ResponseHandler.success(
        res,
        {
          total: clientes.length,
          clientes,
        },
        "Clientes listados com sucesso"
      );
    } catch (error) {
      logger.error("Erro ao listar clientes:", error);
      return ResponseHandler.error(res, "Erro ao listar clientes");
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const cliente = await clienteService.findById(id);

      return ResponseHandler.success(res, cliente, "Cliente encontrado");
    } catch (error) {
      logger.error("Erro ao buscar cliente:", error);

      if (error.message === "Cliente não encontrado") {
        return ResponseHandler.notFound(res, error.message);
      }

      return ResponseHandler.error(res, "Erro ao buscar cliente");
    }
  }

  async store(req, res) {
    try {
      const novoCliente = await clienteService.create(req.body);

      return ResponseHandler.created(
        res,
        novoCliente,
        "Cliente criado com sucesso"
      );
    } catch (error) {
      logger.error("Erro ao criar cliente:", error);

      if (error.message.includes("Campos obrigatórios")) {
        return ResponseHandler.badRequest(res, error.message);
      }

      if (error.message === "E-mail já cadastrado") {
        return ResponseHandler.conflict(res, error.message);
      }

      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((e) => ({
          campo: e.path,
          mensagem: e.message,
        }));
        return ResponseHandler.badRequest(res, "Erro de validação", errors);
      }

      return ResponseHandler.error(res, "Erro ao criar cliente");
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const clienteAtualizado = await clienteService.update(id, req.body);

      return ResponseHandler.success(
        res,
        clienteAtualizado,
        "Cliente atualizado com sucesso"
      );
    } catch (error) {
      logger.error("Erro ao atualizar cliente:", error);

      if (error.message === "Cliente não encontrado") {
        return ResponseHandler.notFound(res, error.message);
      }

      if (error.message === "E-mail já cadastrado") {
        return ResponseHandler.conflict(res, error.message);
      }

      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((e) => ({
          campo: e.path,
          mensagem: e.message,
        }));
        return ResponseHandler.badRequest(res, "Erro de validação", errors);
      }

      return ResponseHandler.error(res, "Erro ao atualizar cliente");
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await clienteService.delete(id);

      return ResponseHandler.success(res, null, "Cliente excluído com sucesso");
    } catch (error) {
      logger.error("Erro ao excluir cliente:", error);

      if (error.message === "Cliente não encontrado") {
        return ResponseHandler.notFound(res, error.message);
      }

      return ResponseHandler.error(res, "Erro ao excluir cliente");
    }
  }
}

module.exports = new ClienteController();
