const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/especie.controller');

router.get('/',  usuariosController.index);
router.get('/:id', usuariosController.getById);
router.post('/', usuariosController.create);
router.delete('/:id', usuariosController.delete);
router.patch('/:id', usuariosController.updateParcial);
router.put('/:id', usuariosController.updateCompleto);

module.exports = router;