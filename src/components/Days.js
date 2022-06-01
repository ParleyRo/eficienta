export class Days{

	static freedays = {
		1: [1,2,24],
		4: [22,23,24,25],
		5: [1],
		6: [1,12,13],
		8: [15],
		11: [30],
		12: [1,2,25,26]
	}

	static daysoff = {}

	constructor(date){

		this.date = new Date(date);
		
	}


	getDays() {
		
		let freedays = 0;
		let freedaysList = [];

		let daysoff = 0;
		let daysoffList = [];
		
		let weekendDays = 0;
		let monthDays = 0;

		let workedDays = 0;

		const lastDayOfMonth = new Date(this.date.getFullYear(),this.date.getMonth()+1,0);
		const date = new Date(this.date)

		for(let i=1; i<= lastDayOfMonth.getDate(); i++){

			date.setDate(i);

			if(this.constructor.isFreeDay(i,date.getMonth()) && !this.constructor.isWeekendDay(date.getDay())){
				freedays++;
				freedaysList.push(i)
			}
			
			if(this.constructor.isDayoff(i,date.getMonth()) && !this.constructor.isWeekendDay(date.getDay())){
				daysoff++;
				daysoffList.push(i);
			}

			if(this.constructor.isWeekendDay(date.getDay())){
				weekendDays++;
			}

			if(!this.constructor.isWeekendDay(date.getDay()) && (this.date.getDate() >= i)){
				workedDays++;
			}

			monthDays++;
		}

		return {
			freedays,
			freedaysList,
			daysoff,
			daysoffList,
			weekendDays,
			monthDays,
			workedDays
		};
  	}

	static isDayoff(day,ofMonth){

		if(this.daysoff?.[ofMonth+1] && this.daysoff?.[ofMonth+1].includes(day)){
			return true;
		}

		return false;
	}
	
	static isFreeDay(day,ofMonth){

		if(this.freedays?.[ofMonth+1] && this.freedays?.[ofMonth+1].includes(day)){
			return true;
		}

		return false;
	}

	static isWeekendDay(day){

		if([0,6].includes(day)){
			return true;
		}

		return false;
	}
}

export default Days;