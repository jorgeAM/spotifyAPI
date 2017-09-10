const express = require('express');
//controlador
const songController = require('../controllers/song.js');
//importamos middleware para autenticacion
const authenticatedMiddleware = require('../middlewares/authenticated.js')
//para poder crear rutas
var api = express.Router();
//importamos libreria para subir imagen de artista
var multipart = require('connect-multiparty');
//llamamos al middleware de la libreria
var multipartMiddleware = multipart({
	uploadDir: './uploads/songs'
});



api.get('/song/:id', authenticatedMiddleware.ensureAuth, songController.getSong);
api.post('/create-song', authenticatedMiddleware.ensureAuth, songController.saveSong);
api.get('/songs/:album?', authenticatedMiddleware.ensureAuth, songController.getSongs);
api.put('/song/:id', authenticatedMiddleware.ensureAuth, songController.updateSong);
/*
api.delete('/song/:id', authenticatedMiddleware.ensureAuth, songController.deleteAlbum);
//subir imagen de artista
api.post('/upload-image-album/:id', [authenticatedMiddleware.ensureAuth, multipartMiddleware], songController.uploadImage);
//conseguir imagen de artista
api.get('/get-album-image/:imageFile', songController.getImageFile);
*/
module.exports = api;