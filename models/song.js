//libreria para usar la conexion a db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creamos esquema
var songSchema = new Schema({
	number: String,
	name: String,
	duration: String,
	file: String,
	album: {
		type: Schema.Types.ObjectId,
		ref: 'Album'
	}
});

//exportamos el modelo
module.exports = mongoose.model('Song', songSchema)
