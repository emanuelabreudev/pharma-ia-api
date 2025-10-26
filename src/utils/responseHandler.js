class ResponseHandler {
  static success(
    res,
    data,
    message = "Operação realizada com sucesso",
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(
    res,
    message = "Erro ao processar requisição",
    statusCode = 500,
    errors = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
      timestamp: new Date().toISOString(),
    });
  }

  static notFound(res, message = "Recurso não encontrado") {
    return this.error(res, message, 404);
  }

  static badRequest(res, message = "Requisição inválida", errors = null) {
    return this.error(res, message, 400, errors);
  }

  static conflict(res, message = "Conflito de dados") {
    return this.error(res, message, 409);
  }

  static created(res, data, message = "Recurso criado com sucesso") {
    return this.success(res, data, message, 201);
  }
}

module.exports = ResponseHandler;
