const { Router } = require('express');
const router = Router();
const { registrarUsuario, iniciarSesion, MostrarUsuarios } = require('../controllers/controllerUsuario.js');
const {verificarToken} = require('../middlewares/verificarToken');

router.post('/registro', registrarUsuario);
router.post('/iniciar-sesion', iniciarSesion);
router.get('/getUser', verificarToken, MostrarUsuarios);

module.exports = router;
