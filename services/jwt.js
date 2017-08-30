var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clabe_secret';

exports.createToken = function(user){
	//datos que se van a codificar
	var payload = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		role : user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix()
	};
	//retornaos el token
	return jwt.encode(payload, secret);
}