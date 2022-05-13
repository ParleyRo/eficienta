export class Everhour{

	constructor(currentMonth = 1){
		
		const date = new Date();

		if(currentMonth === 1){

			this.from = `${date.getFullYear()}-${date.getMonth()+1}-1`;
			this.to = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		
		}else{

			date.setMonth(date.getMonth()+currentMonth);
			date.setDate(0);

			this.from = `${date.getFullYear()}-${date.getMonth()+1}-1`;
			this.to = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		}

		this.apiKey = 'b041-4ed8-05ee0b-9dba24-3c732ffe'

	}


	async fetchUserTasks() {
		try {
			const res = await fetch(`https://api.everhour.com/users/me/time?from=${this.from}&to=${this.to}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key': this.apiKey
				}
				});

			return await res.json();

		} catch (error) {
			return {
				error
			}
		}

  }
}

export default Everhour;