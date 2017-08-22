//libreria para usar la conexion a db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creamos esquema
var userSchema = new Schema({
	name: String,
	surname: String,
	email: String,
	password: String,
	role: String,
	image: String
});

//exportamos el modelo
module export = mongoose.model('User', userSchema)
