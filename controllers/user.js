//encriptar password
var bcrypt = require('bcrypt-nodejs');
//importar modelo
var User = require('../models/user.js');

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

//exportamos metodos de controlador
module.exports = {
	pruebas,
	saveUser,
	loginUser
}