const rpc = require('../../middlewares/Rpc');
const Controller = require('./users.controller');
// can be either class or function

function handlers(namespace) {
	rpc.setNamespace(namespace)
	.register('create', async (objValue) => await Controller.create(objValue))
	.register('getByUsername', async (username) => await Controller.getByUsername(username))
	.register('getById', async (id) => await Controller.getById(id))
	.register('getByLogin', async (username,password) => await Controller.getByLogin(username,password))
}

module.exports = handlers
