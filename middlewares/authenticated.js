var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clabe_secret';

exports.ensureAuth = (req, res, next)=>{
	//tendremo que mandar una cabecera authorization
	if(!req.headers.authorization){
		return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación, Crrano!'});
	}
	var token = req.headers.authorization.replace(/['"]+/g, '');
	try{
		var payload = jwt.decode(token, secret);
		if(payload.exp <= moment().unix()){
			//si fecha de expiracion es menor a la actual
			return res.status(401).send({message: 'Crrano, tu token ha EXPIRADO!'});
		}
	}catch(ex){
		console.log(ex);
		return res.status(404).send({message: 'Crrano, tu token no es valido.'});
	}
	//agregamos el payload a un propiedad usuario
	req.user = payload;
	//mandamos llamar al sgt middleware
	next();
}