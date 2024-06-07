const Controller = require('./oauth.controller');
const Jwt = require('../../helpers/Jwt');

const OauthAPI = {

	postConnect: {
		handler: async (request,reply) => {

			const oAuth = await Controller.connectOauthAccount(request.body);

			if(oAuth.token){
				const sJwt = Jwt.signer({user: {id: oAuth.token}});

				reply.setCookie(
					'token',
					sJwt, 
					{
						path: '/',
						expires: new Date(Date.now() + 365*24*60*60*1000)
					}
				);

				return reply.redirect('/');

			}

			return oAuth;

		},
		url:'/oauth/connect'
		
	},
	getDisconnect: {
		handler: async (request,reply) => {

			reply.clearCookie('token');

			reply.redirect('/users/login');
		},
		url:'/oauth/disconnect'
	}
}
module.exports = OauthAPI;