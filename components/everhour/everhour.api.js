const Controller = require('./everhour.controller');
const View = require('../../middlewares/View.js');
const moment = require('moment')

const EverhourAPI = {
	getCurrent:{
		handler: async (request,reply) => {
			
			if(request.auth == null){
				return reply.redirect('/users/login');
			}

			return new View(request,reply)
				.send('everhour/index.eta',await Controller.getDefault({
					auth: request.auth
				}));

		},
		url:'/'
	},
	getTime:{
		handler: async (request,reply) => {
			
			if(request.auth == null){
				return reply.redirect('/users/login');
			}

			return new View(request,reply)
				.send('everhour/index.eta',await Controller.getDefault({
					auth: request.auth,
					month: request.params.month,
					year: request.params.year
				}));


		},
		url:'/time/:month(^\\d{2})/:year(^\\d{4})/'
	},
	getStop:{
		handler: async (request,reply) => {

			if(request.auth == null ){
				return reply.code(302).send({ redirectUrl: '/users/login' });
			}

			return await Controller.stopTimer({
				auth: request.auth
			});

		},
		url:'/everhour/stop/'
	},
	getStart:{
		handler: async (request,reply) => {
			
			if(request.auth == null){
				return reply.code(302).send({ redirectUrl: '/users/login'});
			}

			return await Controller.startTimer({
				auth: request.auth
			});

		},
		url:'/everhour/start/'
	},
	getStatus:{
		handler: async (request,reply) => {
			
			if(request.auth == null){
				return reply.code(302).send({ redirectUrl: '/users/login'});
			}

			return await Controller.getStatus({
				auth: request.auth
			});
		},
		url:'/everhour/status/'
	}

}
module.exports = EverhourAPI;


