const db = require('../../libraries/database.js');

class Days {

	constructor(idUser,oDate) {
		
		this.date = oDate;
		this.idUser = idUser;

		this.daysoff = this.getDaysoff();
		this.name = this.getName();
	}
	
	static monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

	static freedays = {
		1: [1,2,24],
		5: [1,3,5,6],
		6: [1,23,24],
		8: [15],
		11: [30],
		12: [1,25,26]
	}

	async syncProperties(){
	
		const promises = [];

        for(const propName in this){

            if((typeof this[propName] === 'object') && (this[propName] instanceof Promise)){
            
                promises.push({
                    prop: this[propName],
                    name: propName
                });

            }
        }
        
        await Promise.allSettled(promises.map(property=>{return property.prop}));

        for(const promise of promises){
            this[promise.name] = await promise.prop
        }
	}

	async getName(){

		return await db.getScalar(`SELECT value FROM users_data WHERE id_user=? AND field='name'`,[this.idUser],'value');
	}
	async getDaysoff(){
		
		const resultObject = {};

		const data = await db.query(`SELECT * FROM daysoff WHERE id_user=? AND month=? AND year=?`,[this.idUser,this.date.getMonth(),this.date.getFullYear()]);

		data.forEach((day) => {

			if (!resultObject[day.month]) {
				resultObject[day.month] = [];
			}

			resultObject[day.month].push(day.day);
		});

		return resultObject;
	}

	async getData() {
		
		await this.syncProperties();

		const oDate = new Date(this.date.getFullYear(),this.date.getMonth() + 1, 0);

		oDate.setMinutes(oDate.getMinutes() - oDate.getTimezoneOffset());

		const iLastDay = oDate.getDate();

		const oData = {
			currentMonth:{
				index: this.date.getMonth(),
				name: Days.monthNames[this.date.getMonth()],
				year: this.date.getFullYear()
			},
			prevMonth:{
				index: (this.date.getMonth() + 12 - 1) % 12,
				name: Days.monthNames[(this.date.getMonth() + 12 - 1) % 12],
				year: ( (this.date.getMonth() + 12 - 1) % 12 > this.date.getMonth() ) ? this.date.getFullYear() - 1 : this.date.getFullYear()
			},
			nextMonth:{
				index: (this.date.getMonth() + 12 + 1) % 12,
				name: Days.monthNames[(this.date.getMonth() + 12 + 1) % 12],
				year: ( (this.date.getMonth() + 12 - 1) % 12 < this.date.getMonth() ) ? this.date.getFullYear() + 1 : this.date.getFullYear()
			},
			freedays: 0,
			freedaysList: [],
			freedayspast: 0,
			daysoff: 0,
			daysoffList: [],
			daysoffpast: 0,
			weekendDays: 0,
			monthDays: iLastDay,
			workedDays: 0,
			name: this.name
		};
		
		for(let i=1; i<= iLastDay; i++){

			oDate.setDate(i);

			if(this.isFreeDay(i) && !this.isWeekendDay(oDate.getDay())){
				oData.freedays++;
				oData.freedaysList.push(i);
				if(this.date.getDate() >= i){
					oData.freedayspast++;
				}
			}
			
			if(this.isDayoff(i) && !this.isWeekendDay(oDate.getDay())){
				oData.daysoff++;
				oData.daysoffList.push(i);
				if(this.date.getDate() >= i){
					oData.daysoffpast++;
				}
			}

			if(this.isWeekendDay(oDate.getDay())){
				oData.weekendDays++;
			}

			if(!this.isWeekendDay(oDate.getDay()) && (this.date.getDate() >= i)){
				oData.workedDays++;
			}

		}

		return oData;
    }

	isDayoff(day){
		
		if(this.daysoff?.[this.date.getMonth()] && this.daysoff?.[this.date.getMonth()].includes(day)){
			return true;
		}

		return false;
	}
	
	isFreeDay(day){

		if(Days.freedays?.[this.date.getMonth()+1] && Days.freedays?.[this.date.getMonth()+1].includes(day)){
			return true;
		}

		return false;
	}

	isWeekendDay(day){

		if([0,6].includes(day)){
			return true;
		}

		return false;
	}


}

module.exports = Days;
