//libreria para usar la conexion a db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creamos esquema
var artistSchema = new Schema({
	name: String,
	description: String,	
	image: String
});

//exportamos el modelo
module.exports = mongoose.model('Artist', artistSchema);
