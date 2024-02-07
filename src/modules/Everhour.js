let _apikey = false;
class Everhour{

	
	constructor(apikey='', date = false){

		if(date){
			this.from = `${date.getFullYear()}-${date.getMonth()+1}-1`;
			this.to = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		}

		this.apikey = apikey
		_apikey = apikey
	}

	async fetchUserTasks() {

		try {

			const res = await fetch(`https://api.everhour.com/users/me/time?from=${this.from}&to=${this.to}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key': this.apikey
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
			
			return await res.json();

		} catch (error) {
			return {
				error
			}
		}
	}
	
	async getCurrentTime(){
	
		try {

			const res = await fetch(`https://api.everhour.com/timers/current`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key': this.apikey
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
			
			return await res.json();
			
		} catch (error) {
			
			return {
				error
			}
		}
	}

	static async stopTimer(){

		try {

			const res = fetch(`https://api.everhour.com/timers/current`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key': _apikey
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
			
			return await res.json();
			
		} catch (error) {
			
			return {
				error
			}
		}
	}
	async sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
}

export default Everhour;