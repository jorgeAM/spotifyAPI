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
	Album.findById(albumId).populate('artist').exec((err, album) => {
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			if(!album){
				res.status(404).send({message: 'Crrano, hubo un error al consegur album'});
			}else{
				res.status(200).send({ album: album });
			}
		}
	});
}

function getAlbums(req, res){
	//guardamos id de artist
	let artistId = req.params.artist;
	//si hubiera id de artista en parametro
	if(!artistId){
		//si no lo hay, mostramos todos los albunes
		var find = Album.find().sort('title');
	}else{
		//si hay id de artista
		var find = Album.find({artist: artistId}).sort('year');
	}
	find.populate('artist').exec((err, albums) => {
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			if(!albums){
				res.status(404).send({message: 'Crrano, hubo un error al consegur albums'});
			}else{
				res.status(200).send({ albums: albums });
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

function updateAlbum(req, res){
	//guardamos id de album
	let albumId = req.params.id;
	let update = req.body;
	//actualizamos
	Album.findByIdAndUpdate(albumId, update, (err, album) => {
		//si hay una error
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			if(!album){
				res.status(404).send({message: 'Crrano, hubo un error al actualizar album'});
			}else{
				res.status(200).send({album : album});
			}
		}
	})
}

module.exports = {
	getAlbum,
	getAlbums,
	saveAlbum,
	updateAlbum
};