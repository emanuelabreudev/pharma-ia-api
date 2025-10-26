/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - telefone
 *         - cidade
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do cliente (gerado automaticamente)
 *           example: 1
 *         nome:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: Nome completo do cliente
 *           example: "Ana Souza"
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail do cliente (único no sistema)
 *           example: "ana@email.com"
 *         telefone:
 *           type: string
 *           pattern: '^[0-9]{10,11}$'
 *           description: Telefone com 10 ou 11 dígitos numéricos
 *           example: "85999999999"
 *         cidade:
 *           type: string
 *           maxLength: 50
 *           description: Cidade onde o cliente reside
 *           example: "Fortaleza"
 *         status:
 *           type: boolean
 *           description: Status ativo/inativo do cliente
 *           default: true
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *
 *     ClienteInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - telefone
 *         - cidade
 *       properties:
 *         nome:
 *           type: string
 *           example: "Ana Souza"
 *         email:
 *           type: string
 *           format: email
 *           example: "ana@email.com"
 *         telefone:
 *           type: string
 *           example: "85999999999"
 *         cidade:
 *           type: string
 *           example: "Fortaleza"
 *         status:
 *           type: boolean
 *           example: true
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Operação realizada com sucesso"
 *         data:
 *           type: object
 *         timestamp:
 *           type: string
 *           format: date-time
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Erro ao processar requisição"
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *         timestamp:
 *           type: string
 *           format: date-time
 */

module.exports = {};
