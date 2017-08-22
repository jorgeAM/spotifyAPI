//cargamos libreria para conexion con db
var mongoose = require('mongoose');
//conectamos a la db
mongoose.connect('mongodb://localhost/spotify', {
	useMongoClient: true,
}, (err, res) => {
	if(err){
		throw err;
	}
	else { console.log('conexion exitosa'); }
});