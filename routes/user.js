var express = require('express');
//controlador
var userController = require('../controllers/user.js');
//para poder crear rutas
var api = express.Router();
//importamos middleware para autenticacion
var authenticatedMiddleware = require('../middlewares/authenticated.js')

api.get('/prueba', authenticatedMiddleware.ensureAuth, userController.pruebas);
//crear ruta para creacion de usuario
api.post('/register', userController.saveUser);
//iniciar sesión
api.post('/login', userController.loginUser);

module.exports = api;