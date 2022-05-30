import {Component} from 'react';
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";

import _ from "lodash";

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
			oDaysoff[value.month.number].push(value.day)//[...oDaysoff[value.month.number],value.day]
		});

		const url = `${window.location.protocol}//${window.location.hostname}:5001/save`;
		
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({secret: this.props.data.user.savedData.value.secret, daysoff: oDaysoff})
		});

		const result = await res.json();

		if(result.success){

			this.setState({values: oDaysoff});

		}
	}
	componentDidMount() {

		if(this.props.data.user?.savedData?.value?.daysoff && this.props.data.user?.savedData?.value?.daysoff !== this.state.daysoff){

			let dates = []
			for (const [month,daysInMonth] of Object.entries(this.props.data.user.savedData.value.daysoff)) {

				daysInMonth.forEach((day)=>{
					
					let date = new Date(`${this.props.data.user.year}/${month}/${day}`);
					
					dates.push(date);

				})
			}

			this.setState({
				daysoff: this.props.data.user.savedData.value.daysoff,
				dates: dates
			})		
		}

	}

	componentDidUpdate(prevProps, prevState, snapshot){

		if(prevProps.data.user?.savedData?.value?.daysoff && prevProps.data.user?.savedData?.value?.daysoff !== this.state.daysoff){

			let dates = []
			for (const [month,daysInMonth] of Object.entries(prevProps.data.user.savedData.value.daysoff)) {

				daysInMonth.forEach((day)=>{
					
					let date = new Date(`${prevProps.data.user.year}/${month}/${day}`);
					
					dates.push(date);

				})
			}

			this.setState({
				daysoff: prevProps.data.user.savedData.value.daysoff,
				dates: dates
			})		
		}

	}
	render(){

		return (
			<>
				<label>Set here you Days off</label>
				<br />
				<DatePicker 
					{...this.state.values} 
					multiple
					format="DD-MM-YYYY"
					value={this.state.dates} 
					onChange={this.setValues}
					onClose={() => {

						if(!_.isEmpty(this.state.values)){
							window.location.reload();
						}
					}}
					showOtherDays
					render={<InputIcon/>}
					
				/>

				
				
			</>

		)
	}
}

 export default Daysoff;