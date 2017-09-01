//cargamos libreria para conexion con db
var mongoose = require('mongoose');
//para arreglar el warning de mongoose
mongoose.Promise = require('bluebird');
//cargamos modulo de app.js
var app = require('./app.js');

//conectamos a la db
mongoose.connect('mongodb://localhost/spotify', {
	useMongoClient: true,
}, (err, res) => {
	if(err){
		throw err;
	}
	else{
		console.log('conexion exitosa');
		app.listen(3100, () => console.log('app corriendo en el puerto 3100!!'));
	}
});