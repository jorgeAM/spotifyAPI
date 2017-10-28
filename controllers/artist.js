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
	let itemsPerPage = 20;
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

function deleteArtist(req, res){
	//guardamos id del artista
	let artistId = req.params.id;
	Artist.findByIdAndRemove(artistId, (err, artist) => {
		//si hay un error
		if(err){
			res.status(500).send({message: 'Error al eliminar el artista, ctm!'});
		}else{
			//si no existe el artista
			if(!artist){
				res.status(404).send({message: 'No pudo eliminar el artista, ctm!'});
			}else{
				//buscamos album del artista y lo removemos
				Album.find({artist: artist._id}).remove((err, album) => {
					//si hay error
					if(err){
						res.status(500).send({message: 'Error al eliminar el album, ctm!'});
					}else{
						//si no existe album
						if(!album){
							res.status(404).send({message: 'No pudo eliminar el album, ctm!'});
						}else{
							//buscamos cancion y luego eliminamos
							Song.find({album: album._id}).remove((err, song) => {
								//si hay error
								if(err){
									res.status(500).send({message: 'Error al eliminar la song, ctm!'});
								}else{
									//si no existe song
									if(!song){
										res.status(404).send({message: 'No pudo eliminar la song, ctm!'});
									}else{
										res.status(200).send({artist: artist});
									}
								}
							});
						}
					}
				});
			}
		}
	});
}

function uploadImage(req, res){
	var artistId = req.params.id;
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
			Artist.findByIdAndUpdate(artistId, {image: file_name}, (err, artist) => {
				if(err){
					res.status(500).send({message: 'Error al subir imagen!'});
				}else {
					if(!artist){
						res.status(404).send({message: 'No pudo actualizar el artista, ctm!'});
					}else{
						res.status(200).send({artist: artist});
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
	var path_file = './uploads/artists/'+imageFile;

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
	getArtists,
	getArtist,
	saveArtist,
	updateArtist,
	deleteArtist,
	uploadImage,
	getImageFile
};
