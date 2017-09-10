//modulo de nodejs para manejar archivos
const fs = require('fs');
//modulo de nodejs para usar la ruta de lo archivos
const path = require('path');
//importar modelo song
const Song = require('../models/song.js');

function getSong(req, res){
	let songId = req.params.id;
	Song.findById(songId).populate('album').exec((err, song) => {
		//si hay un error
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			if(!song){
				res.status(404).send({message: 'agg tmr, no se pudo mostrar la cancion'});
			}else{
				res.status(200).send({song: song});
			}
		}
	})
}

function getSongs(req, res){
	let albumId = req.params.album
	//si no nos llega el id del album
	if(!albumId){
		var find = Song.find({}).sort('number');
	}else{
		//nos llego el id del album
		var find = Song.find({album: albumId}).sort('number');
	}
	find.populate({
		path: 'album',
		populate: {
			path: 'artist',
			model: 'Artist'
		}
	})
	.exec((err, songs) => {
		//si hay un error
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			if(!songs){
				res.status(404).send({message: 'agg tmr, no se pudo mostrar la canciones'});
			}else{
				res.status(200).send({songs: songs});
			}
		}
	});

}

function saveSong(req, res){
	//creamos objeto song
	let song = new Song();
	//guardamos parametros
	params = req.body;
	song.number = params.number;
	song.name = params.name;
	song.duration = params.duration;
	song.file = null;
	song.album = params.album;
	song.save((err, song) => {
		//si hay un error
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			if(!song){
				res.status(404).send({message: 'agg tmr, no se pudo crear la cancion'});
			}else{
				res.status(200).send({song: song});
			}
		}
	});
}

module.exports = {
	getSong,
	getSongs,
	saveSong
};