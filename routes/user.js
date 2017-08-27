var express = require('express');
//controlador
var userController = require('../controllers/user.js');
//para poder crear rutas
var api = express.Router();

api.get('/prueba', userController.pruebas);
//crear ruta para creacion de usuario
api.post('/register', userController.saveUser);
//iniciar sesión
api.post('/login', userController.loginUser);

module.exports = api;