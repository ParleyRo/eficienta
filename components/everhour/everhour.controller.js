const rpc = require('../../middlewares/Rpc');
const Everhour = require('./everhour');
const Days = require('./days');

module.exports = {

	async getDefault(params) {
		
		const token = await Everhour.getTokenByIdUser(params.auth.user.id);

		const oDate = new Date;
		
		if(params.year){
			oDate.setFullYear(params.year);
		}
		if(params.month){
			oDate.setMonth(params.month);
			oDate.setDate(0);
		}

		oDate.setMinutes(oDate.getMinutes() - oDate.getTimezoneOffset());

		const everhourData = await Everhour.getMonthData(token,oDate);

		const oDays = new Days(params.auth.user.id,oDate);

		const data = await oDays.getData();

		const oData = {
			auth: params.auth,
			everhourData,
			data
		}

		return oData
	},

	async stopTimer(params){
	
		try {
			const token = await Everhour.getTokenByIdUser(params.auth.user.id);
			
			const res = await fetch(`https://api.everhour.com/timers/current`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key': token
				}
			});

			if(res.status === 404){
				return {
					error: {
						type: 'bad_api_key',
						description: 'Not a valid api key'
					}
				}
			}
			
			const result = await res.json();

			return result
			
		} catch (error) {

			return {
				error
			}
		}
	},

	async startTimer(params){

		try {
			
			const token = await Everhour.getTokenByIdUser(params.auth.user.id);

			const res = await fetch(`https://api.everhour.com/users/me/time?limit=20`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key': token
				}
			});

			const results = await res.json();

			if(results && results.length){

				const task = results.find((result)=> result.task != null);

				const resTime = await fetch(`https://api.everhour.com/timers`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-Api-Key': token
					},
					body: JSON.stringify({
						task: task.task.id
					})
				});

				return await resTime.json();

			}
		} catch (error) {
			return error
		}
	},

	async getStatus(params){
		
		try {

			const token = await Everhour.getTokenByIdUser(params.auth.user.id);

			const res = await fetch(`https://api.everhour.com/timers/current`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key': token
				}
			});

			const results = await res.json();

			return results;
		
		} catch (error) {
			return error
		}
	}

}
