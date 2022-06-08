import React from 'react';
import _ from "lodash";

import InvoiceView from './invoice/InvoiceView.js';
import CurrentData from './invoice/CurrentData.js';

import ReactToPrint from 'react-to-print';

class Invoice extends React.Component {

	constructor(props) {
		super(props);

		const date = new Date();
		
		const dueDate = new Date();
		dueDate.setDate(dueDate.getDate() +10);
		
		this.state = {	
			current: {
				pos1: {
					income: '',
					description: 'Consulting Services',
				},
				pos2: {
					active: false,
					description: '',
					amount: ''
				},
				pos3: {
					active: false,
					description: '',
					amount: ''
				},
				invoiceNumber: '',
				invoiceDate: `${('0'+date.getDate()).slice(-2)}/${('0'+(date.getMonth()+1)).slice(-2)}/${date.getFullYear()}`,
				invoiceDueDate: `${('0'+dueDate.getDate()).slice(-2)}/${('0'+(dueDate.getMonth()+1)).slice(-2)}/${dueDate.getFullYear()}`,
			},
			fieldsWithError:[
				'current.invoiceNumber',
				'current.pos1.income',
				'current.pos2.description','current.pos2.amount',
				'current.pos3.description','current.pos3.amount'
			],
			date: {
				day: null
			},
			rate: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.addNewPos = this.addNewPos.bind(this);
		this.getRate = this.getRate.bind(this);

		this.rateStats = {
			requestStarted: false,
			requestFinish: false,
			value: 0
		}
	}

	addNewPos(event){

		let oCurrent = this.state.current;
		oCurrent[`pos${event.target.dataset.pos}`] = {...oCurrent[`pos${event.target.dataset.pos}`],active: !oCurrent[`pos${event.target.dataset.pos}`].active} 
		
		this.setState({ 
			current: oCurrent
		});
	}

	getMatchByType(type){

		if(type === 'number'){
			return /^[0-9]*$/;
		}

		if(type === 'date'){
			return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
		}

		return /[A-Za-z0-9 _.,!"'/$]*/
	}

	async getRate(){

		if(this.state.current.invoiceDate.match(this.getMatchByType('date')) == null){
			return;
		}

		const y = parseInt(this.state.current.invoiceDate.split('/')[2]);
		const m = parseInt(this.state.current.invoiceDate.split('/')[1]);
		const d = parseInt(this.state.current.invoiceDate.split('/')[0]);
		
		const url = `${window.location.protocol}//${window.location.hostname}:5001/cursbnr?d=${d}&m=${m}&y=${y}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		
		const json = await res.json();

		this.setState({rate: json});

		return json[0];
	}

	async handleChange(event) {

		const value = event.target.value.replace(/\s/g, '');
		const stateLocation = event.target.dataset.stateLocation;
		const fieldType = event.target.dataset.type || 'text';
		
		if(fieldType === 'date'){
		
			if(value.split('/').length < 3){
				return false;
			}

			if(value.length > 10){
				return false;
			}
		}

		if((value === '' || value == null || value.match(this.getMatchByType(fieldType)) == null)){

			if(!this.state.fieldsWithError.includes(stateLocation)){
				_.set(this.state, 'fieldsWithError', [...this.state.fieldsWithError, stateLocation]);
			}

		}else{

			const fieldsWithError = [...this.state.fieldsWithError];
			const index = fieldsWithError.indexOf(stateLocation);

			if (index > -1) {
				fieldsWithError.splice(index, 1);
				_.set(this.state, 'fieldsWithError', fieldsWithError);
			}
		}

		_.set(this.state, stateLocation, value);
		
		this.setState(this.state);

	}


	async componentDidMount(){
		
		if(this.rateStats.requestStarted === false){
			
			this.rateStats.requestStarted = true;

			await this.getRate();
			
		}

	}

	printHandler(resolve, reject) {

		let fieldsWithError = [...this.state.fieldsWithError];
		let index = null;

		if(this.state.current.pos2.active === false){
			
			index = fieldsWithError.indexOf('current.pos2.description');
			if (index > -1) {
				fieldsWithError.splice(index, 1); // 2nd parameter means remove one item only
			}

			index = fieldsWithError.indexOf('current.pos2.amount');
			if (index > -1) {
				fieldsWithError.splice(index, 1); // 2nd parameter means remove one item only
			}
		}

		if(this.state.current.pos3.active === false){
			
			index = fieldsWithError.indexOf('current.pos3.description');
			if (index > -1) {
				fieldsWithError.splice(index, 1); // 2nd parameter means remove one item only
			}

			index = fieldsWithError.indexOf('current.pos3.amount');
			if (index > -1) {
				fieldsWithError.splice(index, 1); // 2nd parameter means remove one item only
			}
		}

		if(fieldsWithError.length){
			if(!window.confirm('Are you sure? there are some empty fields !!!')){
				reject();
				return; 
			}
		}

		resolve();
	
	}
	render(){
		console.log(1,'Invoice Rendered')
		return (
			<div className="invoice scroll-y custom-scroll">
				
				<CurrentData 
					current={this.state.current} 
					fieldsWithError={this.state.fieldsWithError} 
					handleChange={this.handleChange}
					addNewPos={this.addNewPos}
					getRate={this.getRate}
					rate={this.state.rate}
				/>

				<hr />

				<div className="text-right ">
					<ReactToPrint
						content={() => this.componentRef}
						trigger={() => <button className="">Print to PDF!</button>}
						onBeforePrint={async () => {
							await new Promise((resolve, reject) => {
								this.printHandler(resolve, reject);
							});
						}}
					/>
				</div>
				
				<br />

				<InvoiceView 
					ref={el => (this.componentRef = el)}
					date={{month: this.props.data.monthInfo.name, year: this.props.data.monthInfo.year}} 
					current={this.state.current}
					fieldsWithError={this.state.fieldsWithError}
					invoice={this.props.data.user.invoice}
					rate={this.state.rate}
					efficiency={this.props.data.efficiency}
				/>
				
				<div className="text-right ">
					<ReactToPrint
						content={() => this.componentRef}
						trigger={() => <button className="">Print to PDF!</button>}
						onBeforePrint={async () => {
							await new Promise((resolve, reject) => {
								this.printHandler(resolve, reject);
							});
						}}
						
					/>
				</div>


			</div>
				
		)
	}
}

export default Invoice