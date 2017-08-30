var express = require('express');
//controlador
var userController = require('../controllers/user.js');
//para poder crear rutas
var api = express.Router();
//importamos middleware para autenticacion
var authenticatedMiddleware = require('../middlewares/authenticated.js')
//importamos libreria para subir avatar
var multipart = require('connect-multiparty');
//llamamos al middleware de la libreria
var multipartMiddleware = multipart({
	uploadDir: './uploads/users'
});


api.get('/prueba', authenticatedMiddleware.ensureAuth, userController.pruebas);
//crear ruta para creacion de usuario
api.post('/register', userController.saveUser);
//iniciar sesión
api.post('/login', userController.loginUser);
//actualizar usuario
api.put('/update-user/:id', authenticatedMiddleware.ensureAuth, userController.updateUser);
//subir avatar
api.post('/upload-avatar/:id', [authenticatedMiddleware.ensureAuth, multipartMiddleware], userController.uploadAvatar);

module.exports = api;