const express = require('express');
//controlador
const artistController = require('../controllers/artist.js');
//importamos middleware para autenticacion
const authenticatedMiddleware = require('../middlewares/authenticated.js')
//para poder crear rutas
var api = express.Router();


api.get('/artist/:id', authenticatedMiddleware.ensureAuth, artistController.getArtist);
api.post('/create-artist', authenticatedMiddleware.ensureAuth, artistController.saveArtist);
api.get('/artists/:page?', authenticatedMiddleware.ensureAuth, artistController.getArtists);
api.put('/artist/:id', authenticatedMiddleware.ensureAuth, artistController.updateArtist);
api.delete('/artist/:id', authenticatedMiddleware.ensureAuth, artistController.deleteArtist);

module.exports = api;