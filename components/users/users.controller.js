// const aws = require('./aws').getInstance();
const User = require('./user');


module.exports = {

	async getDefault(params) {
			
		const oData = {
			auth: params.auth,
		}

		return oData
	},

	async getByUsername(username) {
		if (!username) throw {"error":"username-required","message":"Username is required"};
		
		return await User.getByUsername(username);
	},
	async getById(id) {
		if (!id) throw {"error":"id-required","message":"id is required"};
		
		return await User.getById(id);
	},
	async getByLogin(username,password) {
		
		if (!username) return  {
			"error":"username-required",
			"message":"Username is required"
		};

		if (!password) return {
			"error":"password-required",
			"message":"Password is required"
		};
		
		return await User.getByLogin(username,password);
	},
	async create(objValue = {}) {
		
		return await User.create(objValue);
	}
	
	

}
