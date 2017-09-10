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

function deleteAlbum(req, res){
	albumId = req.params.id;
	Album.findByIdAndRemove(albumId, (err, album) => {
		//si hay error
		if(err){
			res.status(500).send({message: 'Crrano, hubo un error'});
		}else{
			if(!album){
				res.status(404).send({message: 'Crrano, hubo un error al eliminar album'});
			}else{
				//eliminamos canciones del album
				Song.find({album: albumId}).remove((err, song) => {
					//si hay un error
					if(err){
						res.status(500).send({message: 'Crrano, hubo un error'});
					}else{
						if(!song){
							res.status(404).send({message: 'Crrano, hubo un error al eliminar cancion'});
						}else{
							res.status(200).send({album: album});
						}
					}
				});
			}
		}
	});
}

function uploadImage(req, res){
	var albumId = req.params.id;
	var file_name = 'No subido...';
	if(req.files){
		//ruta del archivo
		var file_path = req.files.image.path;
		//separamos la ruta por '/'
		var file_split = file_path.split('/');
		//sacamos el nombre de archivo
		var file_name = file_split[2];
		//separamos el nombre del archivo por .
		var ext_split = file_name.split('.')
		//sacamos la extensión del archivo
		var ext_file = ext_split[1];
		//comprobamos si es un imagen
		if(ext_file == 'png' || ext_file == 'jpg' || ext_file == 'gif'){
			//me deja subir la imagen
			Album.findByIdAndUpdate(albumId, {image: file_name}, (err, album) => {
				if(err){
					res.status(500).send({message: 'Error al subir imagen!'});
				}else {
					if(!album){
						res.status(404).send({message: 'No pudo actualizar el album, ctm!'});
					}else{
						res.status(200).send({album: album});
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

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/albums/'+imageFile;
	//vemos si esta la imagen
	fs.stat(path_file, (err, stat) =>{
		if(err){
			res.status(500).send({message: 'Error al conseguir imagen!'});
		}else{
			if(stat){
				res.sendFile(path.resolve(path_file));
			}
		}
	})
}

module.exports = {
	getAlbum,
	getAlbums,
	saveAlbum,
	updateAlbum,
	deleteAlbum,
	uploadImage,
	getImageFile
};