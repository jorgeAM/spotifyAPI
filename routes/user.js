var express = require('express');
//controlador
var userController = require('../controllers/user.js');
//para poder crear rutas
var api = express.Router();

api.get('/prueba', userController.pruebas);

module.exports = api;