//encriptar password
var bcrypt = require('bcrypt-nodejs');
//importar modelo
var User = require('../models/user.js');
//importamos servicio jwt
var jwt = require('../services/jwt.js');

function pruebas(req, res){
	res.status(200).send({
		message: 'Prueba'
	})
}

function saveUser(req, res){
	var user = new User();
	var params = req.body;
	//seteamos valores a la instancia user
	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_USER';
	user.image = 'null';
	//si existe passward en req
	if(params.password){
		//encriptar contraseña de forma asincrona
		bcrypt.hash(params.password, null, null, (err, hash) =>{
			user.password = hash;
			if(user.name != null && user.surname != null && user.email != null){
				//guardamos el usuario
				user.save((err, user) => {
					if(err){
						res.status(500).send({message: 'Qué hiciste Crrano?'});
					}else{
						res.status(200).send({message: user});
					}
				});
			}else{
				res.status(500).send({message: 'Rellena todos los datos, Crrano!'});
			}
		});
	}else{
		res.status(500).send({message: 'Introduce la contraseña'});
	}
}

function loginUser(req, res){
	var params = req.body;
	var email = params.email;
	var password = params.password;
	//buscamos usuario
	User.findOne({email : email.toLowerCase()}, (err, user) => {
		if(err){
			res.status(500).send({message: 'Ups, hubo un error crrano'});
		} else {
			if(!user){
				res.status(404).send({message: 'Crrano, usuario no existe'});
			} else{
				//comprobar contraseña
				bcrypt.compare(password, user.password, (err, check) => {
					//si es correcto todo
					if(check){
						//devolver datos de usuario logeado
						if(params.gethash){
							//devolvemos un token de jwt
							res.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message: 'Crrano, escribiste mal la contraseña'});
					}
				})
			}
		}
	});

}

function updateUser(req, res){
	//guardamos id de peticion
	var userId = req.params.id;
	//guardamos todo el cuerpo de la petición
	var update = req.body;
	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario, ctm!'});
		}else {
			if(!userUpdated){
				res.status(404).send({message: 'No pudo actualizar el usuario, ctm!'});
			}else{
				res.status(200).send({user: userUpdated});
			}
		}
	});
}

function uploadAvatar(req, res){
	var userId = req.params.id;
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
			User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
				if(err){
					res.status(500).send({message: 'Error al subir imagen!'});
				}else {
					if(!userUpdated){
						res.status(404).send({message: 'No pudo actualizar el usuario, ctm!'});
					}else{
						res.status(200).send({user: userUpdated});
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

//exportamos metodos de controlador
module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser,
	uploadAvatar
}