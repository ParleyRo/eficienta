const rpc = require('../../middlewares/Rpc');
const Controller = require('./everhour.controller');
// can be either class or function

function handlers(namespace) {
	rpc.setNamespace(namespace)
}

module.exports = handlers
