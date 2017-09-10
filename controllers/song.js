//modulo de nodejs para manejar archivos
const fs = require('fs');
//modulo de nodejs para usar la ruta de lo archivos
const path = require('path');
//importar modelo song
const Song = require('../models/song.js');

function getSong(req, res){
	console.log('gola');
}

module.exports = {
	getSong	
};