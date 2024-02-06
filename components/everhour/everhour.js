const db = require('../../libraries/database.js');
const BaseModel = require('../../abstracts/BaseModel.js');

class Everhour {
	

	static async getTokenByIdUser(id) {
		if (!id) throw {"error":"bad-query","message":"id required"}

		return await db.getScalar("SELECT token FROM everhour WHERE id_user = ?",[id],'token');

    }

	static async getMonthData(token, oDate){

		const oReturnData = {
			time: 0,
			isActive: false
		};

		const aTasksData = await Everhour.getMonthTasksData(token, oDate);
		
		aTasksData.forEach(oTaskData => {
			oReturnData.time += oTaskData.time
		});

		if((new Date).getMonth() === oDate.getMonth()){
		
			const oTaskData = await Everhour.getCurrentTaskData(token);
			if(oTaskData?.duration != null){
				oReturnData.time += oTaskData.duration;
				oReturnData.isActive = true;
			}
		}

		oReturnData.time = Math.round(oReturnData.time / 3600);

		return oReturnData;
	
	}
	
	static async getMonthTasksData(token,oDate){

		try {

			const from = `${oDate.getFullYear()}-${oDate.getMonth()+1}-1`;
			const to = `${oDate.getFullYear()}-${oDate.getMonth()+1}-${oDate.getDate()}`;

			const res = await fetch(`https://api.everhour.com/users/me/time?from=${from}&to=${to}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key': token
				}
			});

			if(res.status === 404){
				throw {
					type: 'bad_api_key',
					description: 'Not a valid api key'
				}
			}

			return await res.json();

		} catch (error) {
			
			console.log(error);

			return {
				error,
				time: 0
			}
		}
	
	}

	static async getCurrentTaskData(token){
	
		try {

			const res = await fetch(`https://api.everhour.com/timers/current`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key': token
				}
			});

			if(res.status === 404){
				throw {
					type: 'bad_api_key',
					description: 'Not a valid api key'
				}
			}
			
			return await res.json();
			
		} catch (error) {

			console.log(error);

			return {
				error,
				time: 0
			}
		}
	}


}

module.exports = Everhour;
