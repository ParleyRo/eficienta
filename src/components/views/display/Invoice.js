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
					efficiency: 0
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
			return /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
		}

		return /[A-Za-z0-9 _.,!"'/$]*/
	}

	handleChange(event) {

		const value = event.target.value.trim();
		const stateLocation = event.target.dataset.stateLocation;
		const fieldType = event.target.dataset.type || 'text';
			
		if((value === '' || value == null || value.match(this.getMatchByType(fieldType))==null)){

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

		console.log(3,'invoice', this.props.data);
		
		const date = new Date(`${this.props.data.monthInfo.name} ${this.props.data.monthInfo.day}, ${this.props.data.monthInfo.year}`)

		const url = `${window.location.protocol}//${window.location.hostname}:5001/cursbnr?d=${date.getDate()}&m=${((date.getMonth()+1)+12)%12}&y=${date.getFullYear()}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const rate = await res.json();
		
		this.setState({rate:rate});

	}

	componentDidUpdate(prevProps, prevState, snapshot){

		if(prevProps.data.efficiency.total && prevProps.data.efficiency.total !== this.state.current.pos1.efficiency){
			this.setState({ 
				current: { 
					...this.state.current,
					pos1: {
						...this.state.current.pos1,
						efficiency: prevProps.data.efficiency.total
					}
				}
			});
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

		return (
			<div className="invoice">

				<div className="row is-flex">
					<div className="col">

						<h2 className="title">Invoice</h2>

					</div>
				</div>
				
				<CurrentData 
					current={this.state.current} 
					fieldsWithError={this.state.fieldsWithError} 
					handleChange={this.handleChange}
					addNewPos={this.addNewPos}
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

				<InvoiceView 
					ref={el => (this.componentRef = el)}
					date={{month: this.props.data.monthInfo.name, year: this.props.data.monthInfo.year}} 
					current={this.state.current}
					fieldsWithError={this.state.fieldsWithError}
					invoice={this.props.data.user.invoice}
					rate={this.state.rate}
				/>
				
				<div className="text-right ">
					<ReactToPrint
						content={() => this.componentRef}
						trigger={() => <button className="">Print to PDF!</button>}
					/>
				</div>


			</div>
				
		)
	}
}

export default Invoice