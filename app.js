//cargamos libreria de express
const express = require('express')
//cargamos libreria que usaremos para pasar datos
var bodyParser = require('body-parser')
//cargamos objeto express
const app = express()

//rutas


//configurar bodyparser
app.use(bodyParser.urlencoded({extended: false}))
//ára que convierta a json los datos que nos llegaran
app.use(bodyParser.json())

//configurar cabeceras http


//rutas base
app.get('/', (req, res) =>{
	res.status(200).send({message: 'Spotify'})
})

module.exports = app;