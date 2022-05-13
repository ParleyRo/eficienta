export class Days{

	daysoff = {
		2: [15,16],
		4: [21]
	}

	freedays = {
		4: [22,23,24,25],
		5: [1],
		6: [1,12,13],
		8: [15],
		11: [30],
		12: [1,2,25,26]
	}

	constructor(month,day){
		
		const date = new Date();

		date.setMonth(date.getMonth()+month);
		date.setDate(0);

		this.lastDayOfTheMonth = date.getDate();
		this.month = date.getMonth();
	
		this.day = day;
		this.date = date;
	}


	getDays() {
		
		let freedays = 0;
		let freedaysList = [];

		let daysoff = 0;
		let daysoffList = [];
		
		let weekendDays = 0;
		let totalDays = 0;

		let workedDays = 0;

		this.date.setMonth(this.month);

		for(let i=1; i<=this.lastDayOfTheMonth; i++){

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

			if(!this.isWeekendDay() && (this.day >= i)){
				workedDays++;
			}

			totalDays++;
		}

		return {
			freedays,freedaysList,daysoff,daysoffList,weekendDays,totalDays,workedDays
		};
  	}

	isDayoff(day){
	
		if(this.daysoff[this.month+1] && this.daysoff[this.month+1].includes(day)){
			return true;
		}

		return false;
	}
	
	isFreeDay(day){

		if(this.freedays[this.month+1] && this.freedays[this.month+1].includes(day)){
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