function pruebas(req, res){
	res.status(200).send({
		message: 'Prueba'
	})
}

//exportamos metodos de controlador
module.exports = {
	pruebas
}