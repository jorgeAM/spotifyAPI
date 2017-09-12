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

function updateSong(req, res){
	//id de song
	let songId = req.params.id;
	//guardamos parametros en variable
	let update = req.body;
	Song.findByIdAndUpdate(songId, update, (err, song) => {
		//si hay un error
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			if(!song){
				res.status(404).send({message: 'agg tmr, no se pudo actualizar la cancion'});
			}else{
				res.status(200).send({song: song});
			}
		}
	})
}

function deleteSong(req, res){
	//id de song
	let songId = req.params.id;
	Song.findByIdAndRemove(songId, (err, song) => {
		//si hay un error
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			if(!song){
				res.status(404).send({message: 'agg tmr, no se pudo borrar la cancion'});
			}else{
				res.status(200).send({song: song});
			}
		}
	})
}

function uploadSongFile(req, res){
	var songId = req.params.id;
	var file_name = 'No subido...';
	if(req.files){
		//ruta del archivo
		var file_path = req.files.file.path;
		//separamos la ruta por '/'
		var file_split = file_path.split('/');
		//sacamos el nombre de archivo
		var file_name = file_split[2];
		//separamos el nombre del archivo por .
		var ext_split = file_name.split('.')
		//sacamos la extensión del archivo
		var ext_file = ext_split[1];
		//comprobamos si es un imagen
		if(ext_file == 'mp3' || ext_file == 'ogg'){
			//me deja subir la imagen
			Song.findByIdAndUpdate(songId, {file: file_name}, (err, song) => {
				if(err){
					res.status(500).send({message: 'Error al subir cancion!'});
				}else {
					if(!song){
						res.status(404).send({message: 'No pudo actualizar la cancion, ctm!'});
					}else{
						res.status(200).send({song: song});
					}
				}
			});
		}else{
			res.status(200).send({message: 'agg tmr, solo puedes subir imagenes'});
		}
	}else{
		res.status(200).send({message: 'Crrano, no se ha subio ninguna imagen'});
	}
}

function getSongFile(req, res){
	var songFile = req.params.songFile;
	var path_file = './uploads/songs/'+songFile;

	fs.stat(path_file, (err, stat) =>{
		if(err){
			res.status(500).send({message: 'Error al conseguir cancion!'});
		}else{
			if(stat){
				res.sendFile(path.resolve(path_file));
			}
		}
	})
}

module.exports = {
	getSong,
	getSongs,
	saveSong,
	updateSong,
	deleteSong,
	uploadSongFile,
	getSongFile
};