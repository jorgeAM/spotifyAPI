//modulo de nodejs para manejar archivos
const fs = require('fs');
//modulo de nodejs para usar la ruta de lo archivos
const path = require('path');

//importar modulo de paginacion
const mongoosePaginate = require('mongoose-pagination');
//importar modelo artist
const Artist = require('../models/artist.js');
//importar modelo album
const Album = require('../models/album.js');
//importar modelo song
const Song = require('../models/song.js');

function getArtists(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	let itemsPerPage = 2;
	Artist.find().sort('name').paginate(page, itemsPerPage, (err, artists, total) => {
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else {
			if(!artists){
				es.status(404).send({message: 'agg tmr, no se pudo mostrar los artistastas'});
			}else{
				res.status(200).send({
					total: total,
					artists: artists
				});
			}
		}
	})
}

function getArtist(req, res){
	//guardo el id
	let artistId = req.params.id;
	Artist.findById(artistId, (err, artist) => {
		if(err){
			res.status(500).send({message: 'Crrano, no se pudo encontrar el artista'});
		}else{
			if(!artist){
				res.status(404).send({message: 'agg tmr, no se pudo mostrar el artista'});
			}else{
				res.status(200).send({artist: artist});
			}
		}
	})
}

function saveArtist(req, res){
	//creamos 1 artista
	let artist = new Artist();
	//guardamos lo que tiene el req
	let params = req.body;
	//se guarda en instancia
	artist.name = params.name;
	artist.description = params.description;
	artist.image = 'null';
	artist.save((err, artist) => {
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			if(!artist){
				res.status(404).send({message: 'agg tmr, no se pudo guardar'});
			}else{
				res.status(200).send({artist: artist});
			}
		}
	});
}

function updateArtist(req, res){
	//guardamos id de artista
	let artistId = req.params.id;
	let update = req.body;
	Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) =>{
		if(err){
			res.status(500).send({message: 'Error al actualizar el artista, ctm!'});
		}else {
			if(!artistUpdated){
				res.status(404).send({message: 'No pudo actualizar el artista, ctm!'});
			}else{
				res.status(200).send({artist: artistUpdated});
			}
		}
	});
}

module.exports = {
	getArtists,
	getArtist,
	saveArtist,
	updateArtist
};