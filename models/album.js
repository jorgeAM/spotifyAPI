//libreria para usar la conexion a db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creamos esquema
var albumSchema = new Schema({
	title: String,
	description: String,
	year: String,
	image: String,
	artist: {
		type: Schema.Types.ObjectId,
		ref: 'Artist'
	}
});

//exportamos el modelo
module.exports = mongoose.model('Album', albumSchema)
