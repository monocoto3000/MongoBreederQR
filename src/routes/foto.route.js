const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/foto.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

router.get('/',  authMiddleware.verificarJWT, usuariosController.index);
router.get('/:id', authMiddleware.verificarJWT, usuariosController.getById);
router.post('/', authMiddleware.verificarJWT, usuariosController.create);
router.delete('/:id', authMiddleware.verificarJWT, usuariosController.delete);
router.patch('/:id', authMiddleware.verificarJWT, usuariosController.updateParcial);
router.put('/:id', authMiddleware.verificarJWT, usuariosController.updateCompleto);
router.put('/:id/imagen', usuariosController.updateFotoAnimal);

module.exports = router;