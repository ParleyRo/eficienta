import {Component} from 'react';
import DatePicker, { DateObject } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon.js";

class Daysoff extends Component {
	
	constructor(props) {

		super(props);

		this.state={
			values:{},
			dates: [],
			daysoff: null
		}

		this.setValues = this.setValues.bind(this);
	}

	async setValues(values){

		let oDaysoff = {};

		values.forEach((value,index) =>{
			oDaysoff[value.month.number] = oDaysoff[value.month.number] || [];
			oDaysoff[value.month.number].push(value.day);
		});

		const url = `${window.location.protocol}//${window.location.hostname}:6000/save`;
		
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({secret: this.props.data.user.secret, daysoff: oDaysoff})
		});

		const result = await res.json();

		if(result.success){

			this.setState({values: oDaysoff});

			this.props.changedData({daysoff: oDaysoff});
		
		}
	}
	componentDidMount() {

		if(this.props.data.user.daysoff !== this.state.daysoff){

			let dates = []
			for (const [month,daysInMonth] of Object.entries(this.props.data.user.daysoff || {})) {

				daysInMonth.forEach((day)=>{
					
					let date = new Date(`${this.props.data.monthInfo.year}/${month}/${day}`);
					
					dates.push(date);

				})
			}

			this.setState({
				daysoff: this.props.data.user.daysoff,
				dates: dates
			})		
		}

	}

	render(){

		return (
			<>
				<div className="row va-end">
					<div className="col">

						<label>Set here you Days off</label>
						<br />
						<DatePicker 
							{...this.state.values} 
							multiple
							format="DD-MM-YYYY"
							value={this.state.dates} 
							onChange={this.setValues}
							currentDate={new DateObject(new Date(`${this.props.data.monthInfo.year}-${this.props.data.monthInfo.name}-1`))}
							showOtherDays
							render={<InputIcon/>}
							
						/>

					</div>
				</div>
				
			</>

		)
	}
}

 export default Daysoff;