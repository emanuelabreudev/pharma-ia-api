/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     description: Retorna uma lista de todos os clientes cadastrados com suporte a filtros opcionais
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Filtrar por nome (busca parcial, case-insensitive)
 *         example: "ana"
 *       - in: query
 *         name: cidade
 *         schema:
 *           type: string
 *         description: Filtrar por cidade (busca parcial, case-insensitive)
 *         example: "Fortaleza"
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtrar por email (busca exata se contém @, parcial caso contrário)
 *         example: "ana@email.com"
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *         description: Filtrar por status (true para ativos, false para inativos)
 *         example: true
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Clientes listados com sucesso"
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 2
 *                     clientes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Cliente'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Busca um cliente por ID
 *     description: Retorna os dados de um cliente específico pelo seu ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do cliente
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cliente encontrado"
 *                 data:
 *                   $ref: '#/components/schemas/Cliente'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     description: Cadastra um novo cliente no sistema com validação de dados
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cliente criado com sucesso"
 *                 data:
 *                   $ref: '#/components/schemas/Cliente'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: E-mail já cadastrado no sistema
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     description: Atualiza os dados de um cliente. Todos os campos são opcionais
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente a ser atualizado
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Ana Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ana.silva@email.com"
 *               telefone:
 *                 type: string
 *                 example: "85988888888"
 *               cidade:
 *                 type: string
 *                 example: "Fortaleza"
 *               status:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cliente atualizado com sucesso"
 *                 data:
 *                   $ref: '#/components/schemas/Cliente'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente não encontrado
 *       409:
 *         description: E-mail já cadastrado para outro cliente
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Exclui um cliente
 *     description: Remove permanentemente um cliente do sistema
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente a ser excluído
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cliente excluído com sucesso"
 *                 data:
 *                   type: null
 *                   example: null
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 */

module.exports = {};
