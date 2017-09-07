//modulo de nodejs para manejar archivos
const fs = require('fs');
//modulo de nodejs para usar la ruta de lo archivos
const path = require('path');

//importar modulo de paginacion
const mongoosePaginate = require('mongoose-pagination');
//importar modelo album
const Album = require('../models/album.js');
//importar modelo song
const Song = require('../models/song.js');

function getAlbum(req, res){
	//guardamos 
	let albumId = req.params.id;
	Album.findById(albumId, (err, album) => {
		//si hay un error
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			//si no existe album
			if(!album){
				res.status(404).send({message: 'Crrano, hubo un error al mostrar album'});
			}else{
				res.status(200).send({album: album});
			}
		}
	});
}

function saveAlbum(req, res){
	//creamos objeto album
	let album = new Album();
	//guardamos peticion en una variable
	params = req.body;
	//colocamos valores
	album.title = params.title;
	album.description = params.description;
	album.year = params.year;
	album.image = 'null';
	album.artist = params.artist;
	//guardamos album
	album.save((err, album) => {
		//si hay una error
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			if(!album){
				res.status(404).send({message: 'Crrano, hubo un error al guardar album'});
			}else{
				res.status(200).send({album : album});
			}
		}
	});
}

module.exports = {
	getAlbum,
	saveAlbum
};