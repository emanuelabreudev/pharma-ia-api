const { Op, fn, col, where } = require("sequelize");
const Cliente = require("../models/Cliente");

class ClienteService {
  async findAll(filters = {}) {
    const whereClause = this._buildWhereClause(filters);

    return await Cliente.findAll({
      where: whereClause,
      order: [["id", "ASC"]],
    });
  }

  async findById(id) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }
    return cliente;
  }

  async create(clienteData) {
    const { nome, email, telefone, cidade, status = true } = clienteData;

    await this._validateRequiredFields({ nome, email, telefone, cidade });
    await this._checkEmailExists(email);

    return await Cliente.create({
      nome,
      email: email.trim().toLowerCase(),
      telefone,
      cidade,
      status,
    });
  }

  async update(id, clienteData) {
    const cliente = await this.findById(id);
    const { nome, email, telefone, cidade, status } = clienteData;

    if (email && this._isEmailChanged(email, cliente.email)) {
      await this._checkEmailExists(email, id);
    }

    return await cliente.update({
      nome: nome || cliente.nome,
      email: email ? email.trim().toLowerCase() : cliente.email,
      telefone: telefone || cliente.telefone,
      cidade: cidade || cliente.cidade,
      ...(status !== undefined && { status }),
    });
  }

  async delete(id) {
    const cliente = await this.findById(id);
    await cliente.destroy();
    return true;
  }

  _buildWhereClause(filters) {
    const whereClause = {};
    const { nome, cidade, email, status } = filters;

    if (nome) {
      whereClause.nome = { [Op.iLike]: `%${nome}%` };
    }

    if (cidade) {
      whereClause.cidade = { [Op.iLike]: `%${cidade}%` };
    }

    if (email) {
      const emailTrim = email.trim();
      whereClause.email = emailTrim.includes("@")
        ? where(
            fn("lower", fn("trim", col("email"))),
            Op.eq,
            emailTrim.toLowerCase()
          )
        : { [Op.iLike]: `%${email}%` };
    }

    if (status !== undefined) {
      whereClause.status = status === "true" || status === true;
    }

    return whereClause;
  }

  async _validateRequiredFields(fields) {
    const requiredFields = ["nome", "email", "telefone", "cidade"];
    const missingFields = requiredFields.filter((field) => !fields[field]);

    if (missingFields.length > 0) {
      throw new Error(
        `Campos obrigatórios ausentes: ${missingFields.join(", ")}`
      );
    }
  }

  async _checkEmailExists(email, excludeId = null) {
    const normalizedEmail = email.trim().toLowerCase();
    const whereCondition = where(
      fn("lower", fn("trim", col("email"))),
      Op.eq,
      normalizedEmail
    );

    if (excludeId) {
      whereCondition[Op.and] = [{ id: { [Op.ne]: excludeId } }];
    }

    const existingClient = await Cliente.findOne({ where: whereCondition });

    if (existingClient) {
      throw new Error("E-mail já cadastrado");
    }
  }

  _isEmailChanged(newEmail, currentEmail) {
    return (
      newEmail.trim().toLowerCase() !==
      (currentEmail || "").trim().toLowerCase()
    );
  }
}

module.exports = new ClienteService();
