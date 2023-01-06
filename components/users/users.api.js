const Controller = require('./users.controller');
const View = require('../../middlewares/View.js');

const UsersAPI = {
	getConnect: {
		handler: async (request,reply) => {
			// reply.setCookie("foo","doo",{path:"/",httpOnly:true})
			const code = request.query.code
			
			return await Controller.connectOauthAccount(code,request.params.provider);
		}
	},
	get:{
		handler: async (request,reply) => new View(request,reply)
				//.addJs('accountsDashboard.js')
				.send('users/home.eta',await Controller.getDefault({
					auth: request.auth
				})),
		url:'/'
			
	},
	getUser:{
		handler: async (request,reply) => {
			
			const oUser = await Controller.getUserById(request.params.id);

			delete oUser.password;

			return oUser;
		},
		url:'/users/:id'
	}
}
module.exports = UsersAPI;

