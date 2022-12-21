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
		dueDate.setDate(dueDate.getDate() + 10);

		this.state = {	
			current: {
				pos1: {
					index: 1,
					income: props.data.user.invoices?.[props.data.monthInfo.year]?.[props.data.monthInfo.name]?.current.pos1.income || '',
					description: props.data.user.invoices?.[props.data.monthInfo.year]?.[props.data.monthInfo.name]?.current.pos1.description || 'Consulting Services',
				},
				pos2: {
					index: 2,
					active: props.data.user.invoices?.[props.data.monthInfo.year]?.[props.data.monthInfo.name]?.current.pos2.active || false,
					description: props.data.user.invoices?.[props.data.monthInfo.year]?.[props.data.monthInfo.name]?.current.pos2.description || '',
					amount: props.data.user.invoices?.[props.data.monthInfo.year]?.[props.data.monthInfo.name]?.current.pos2.amount || '',
				},
				pos3: {
					index: 3,
					active: props.data.user.invoices?.[props.data.monthInfo.year]?.[props.data.monthInfo.name]?.current.pos3.active || false,
					description: props.data.user.invoices?.[props.data.monthInfo.year]?.[props.data.monthInfo.name]?.current.pos3.description || '',
					amount: props.data.user.invoices?.[props.data.monthInfo.year]?.[props.data.monthInfo.name]?.current.pos3.amount || '',
				},
				invoiceNumber: props.data.user.invoices?.[props.data.monthInfo.year]?.[props.data.monthInfo.name]?.current.invoiceNumber || '',
				invoiceDate:  this.formatDate(this.props.data.user.invoices[this.props.data.monthInfo.year]?.[this.props.data.monthInfo.name]?.rate?.date,date),
				invoiceDueDate: `${('0'+dueDate.getDate()).slice(-2)}/${('0'+(dueDate.getMonth()+1)).slice(-2)}/${dueDate.getFullYear()}`,
			},
			fieldsWithError:[],
			date: {
				day: null
			},
			rate: null
		};
				
		if(this.state.current.invoiceNumber === ''){
			this.state.fieldsWithError.push('current.invoiceNumber');
		}

		if(this.state.current.pos1.income === ''){
			this.state.fieldsWithError.push('current.pos1.income')
		}

		
		if(this.state.current.pos2.amount === ''){
			this.state.fieldsWithError.push('current.pos2.amount');
		}

		if(this.state.current.pos2.description === ''){
			this.state.fieldsWithError.push('current.pos2.description');
		}

		if(this.state.current.pos3.amount === ''){
			this.state.fieldsWithError.push('current.pos3.amount');
		}

		if(this.state.current.pos3.description === ''){
			this.state.fieldsWithError.push('current.pos3.description');
		}

		this.handleChange = this.handleChange.bind(this);
		this.addNewPos = this.addNewPos.bind(this);
		this.getRate = this.getRate.bind(this);
		this.saveInvoice = this.saveInvoice.bind(this);

		this.rateStats = {
			requestStarted: false,
			requestFinish: false,
			value: 0
		}

	}

	formatDate(invoiceDate,currentDate) {

		if(invoiceDate == null){
			return `${('0'+currentDate.getDate()).slice(-2)}/${('0'+(currentDate.getMonth()+1)).slice(-2)}/${currentDate.getFullYear()}`
		}

		const aInvoiceDate = invoiceDate.split('-');

		return `${('0'+aInvoiceDate[2]).slice(-2)}/${('0'+(aInvoiceDate[1])).slice(-2)}/${aInvoiceDate[0]}`
	
	}
	async saveInvoice(){
		
		// if(this.state.fieldsWithError.length){
		// 	alert('You have empty fields');
		// 	console.log(this.state.fieldsWithError)
		// 	return; 
		// }

		if(!window.confirm('You are about to save this Invoice. Are you sure ?!?')){
			return; 
		}

		if(this.props.data.user.invoices?.[this.state.current.invoiceNumber] != null){
			setTimeout(() =>{
			
				if(!window.confirm('You already have one saved. Will you overwrite !?!')){
					return; 
				}

			},500);
		}

		let data = {
			secret: this.props.data.user.secret, 
			invoices: {
				...this.props.data.user.invoices,
				[this.state.current.invoiceNumber]: {
					invoicedAt: {
						year: this.props.data.monthInfo.year,
						month: this.props.data.monthInfo.name
					},
					general: this.props.data.user.invoice.general,
					buyer: this.props.data.user.invoice.buyer,
					current: this.state.current,
					efficiency: this.props.data.efficiency,
					rate: this.state.rate
				}
			}
		}

		const url = `${window.location.protocol}//${window.location.hostname}:5001/save`;

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		await res.json();
		
		this.props.changedData({invoicesAdd:{
			invoice: data.invoices[this.state.current.invoiceNumber],
			number: this.state.current.invoiceNumber
		}})

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

		//const value = event.target.value.replace(/\s/g, '');
		let value = event.target.value.trim();
		
		const stateLocation = event.target.dataset.stateLocation;
		const fieldType = event.target.dataset.type || 'text';
		
		if(fieldType === 'date'){
			
			value = value.replace(/\s/g, '');

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

	printHandler() {

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
				return false;
			}
		}

		return true;
	
	}
	render(){

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
					<button className="button is-primary" onClick={async () =>{
							await new Promise((resolve, reject) => {
								this.saveInvoice();
							});
						}}>
						Save this Invoice
					</button>
					&nbsp;&nbsp;
					<ReactToPrint
						content={() => this.componentRef}
						trigger={() => <button className="button">Print to PDF!</button>}
						onBeforePrint={async () => {
							await new Promise((resolve, reject) => {
								if(this.printHandler()){
									resolve();
								};
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
						trigger={() => <button className="button">Print to PDF!</button>}
						onBeforePrint={async () => {
							await new Promise((resolve, reject) => {
								if(this.printHandler()){
									resolve();
								};
							});
						}}
						
					/>
				</div>


			</div>
				
		)
	}
}

export default Invoice