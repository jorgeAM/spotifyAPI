const express = require('express');
//controlador
const artistController = require('../controllers/artist.js');
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



api.get('/artist/:id', authenticatedMiddleware.ensureAuth, artistController.getArtist);
api.post('/create-artist', authenticatedMiddleware.ensureAuth, artistController.saveArtist);
api.get('/artists/:page?', authenticatedMiddleware.ensureAuth, artistController.getArtists);
api.put('/artist/:id', authenticatedMiddleware.ensureAuth, artistController.updateArtist);
api.delete('/artist/:id', authenticatedMiddleware.ensureAuth, artistController.deleteArtist);
//subir imagen de artista
api.post('/upload-image-artist/:id', [authenticatedMiddleware.ensureAuth, multipartMiddleware], artistController.uploadImage);
//conseguir imagen de artista
api.get('/get-artist-image/:imageFile', artistController.getImageFile);

module.exports = api;