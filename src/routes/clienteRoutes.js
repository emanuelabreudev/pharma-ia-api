const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

router.get("/clientes", clienteController.index);
router.get("/clientes/:id", clienteController.show);
router.post("/clientes", clienteController.store);
router.put("/clientes/:id", clienteController.update);
router.delete("/clientes/:id", clienteController.destroy);

module.exports = router;
