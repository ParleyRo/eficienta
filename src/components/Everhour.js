class Everhour{

	constructor(apikey='', date){

		this.from = `${date.getFullYear()}-${date.getMonth()+1}-1`;
		this.to = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		
		console.log('Everhour: ',this.from,this.to);
		
		this.apikey = apikey
	}

	async fetchUserTasks() {

		try {
			
			//const img = await fetch(`http://127.0.0.1:5001/`,{})
			//await this.sleep(2000)
			
			const res = await fetch(`https://api.everhour.com/users/me/time?from=${this.from}&to=${this.to}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key': this.apikey
				}
			});

			console.log('Everhour request: ',res.status)

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