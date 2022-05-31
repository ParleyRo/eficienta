export class Days{

	freedays = {
		1: [1,2,24],
		4: [22,23,24,25],
		5: [1],
		6: [1,12,13],
		8: [15],
		11: [30],
		12: [1,2,25,26]
	}

	constructor(date,daysoff){

		this.date = new Date(date);

		this.daysoff = daysoff || [];
	}


	getDays() {
		
		let freedays = 0;
		let freedaysList = [];

		let daysoff = 0;
		let daysoffList = [];
		
		let weekendDays = 0;
		let monthDays = 0;

		let workedDays = 0;

		const lastDayOfMonth = new Date(this.date.getYear(),this.date.getMonth()+1,0)
		
		for(let i=1; i<= lastDayOfMonth.getDate(); i++){

			this.date.setDate(i);

			if(this.isFreeDay(i) && !this.isWeekendDay()){
				freedays++;
				freedaysList.push(i)
			}
			
			if(this.isDayoff(i) && !this.isWeekendDay()){
				daysoff++;
				daysoffList.push(i)
			}

			if(this.isWeekendDay()){
				weekendDays++;
			}

			if(!this.isWeekendDay() && (this.date.getDate() >= i)){
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

	isDayoff(day){

		if(this.daysoff[this.date.getMonth()+1] && this.daysoff[this.date.getMonth()+1].includes(day)){
			return true;
		}

		return false;
	}
	
	isFreeDay(day){

		if(this.freedays[this.date.getMonth()+1] && this.freedays[this.date.getMonth()+1].includes(day)){
			return true;
		}

		return false;
	}

	isWeekendDay(){

		if([0,6].includes(this.date.getDay())){
			return true;
		}

		return false;
	}
}

export default Days;