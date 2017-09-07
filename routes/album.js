const express = require('express');
//controlador
const albumController = require('../controllers/album.js');
//importamos middleware para autenticacion
const authenticatedMiddleware = require('../middlewares/authenticated.js')
//para poder crear rutas
var api = express.Router();
//importamos libreria para subir imagen de artista
var multipart = require('connect-multiparty');
//llamamos al middleware de la libreria
var multipartMiddleware = multipart({
	uploadDir: './uploads/artists'
});



api.get('/album/:id', authenticatedMiddleware.ensureAuth, albumController.getAlbum);
api.post('/create-album', authenticatedMiddleware.ensureAuth, albumController.saveAlbum);
/*
api.get('/albums/:page?', authenticatedMiddleware.ensureAuth, albumController.getArtists);
api.put('/album/:id', authenticatedMiddleware.ensureAuth, albumController.updateArtist);
api.delete('/album/:id', authenticatedMiddleware.ensureAuth, albumController.deleteArtist);
//subir imagen de artista
api.post('/upload-image-album/:id', [authenticatedMiddleware.ensureAuth, multipartMiddleware], albumController.uploadImage);
//conseguir imagen de artista
api.get('/get-album-image/:imageFile', albumController.getImageFile);
*/
module.exports = api;