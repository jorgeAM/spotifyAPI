//cargamos libreria de express
const express = require('express')
//cargamos libreria que usaremos para pasar datos
var bodyParser = require('body-parser')
//cargamos objeto express
const app = express()

//rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var song_routes = require('./routes/song');

//configurar bodyparser
app.use(bodyParser.urlencoded({extended: false}))
//para que convierta a json los datos que nos llegaran
app.use(bodyParser.json())

//configurar cabeceras http
app.user((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
})

//rutas base -> le damos como un prefix
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);


module.exports = app;