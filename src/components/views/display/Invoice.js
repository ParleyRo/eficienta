import {Component} from 'react';
import ItemLoading from '../ItemLoading';
import _ from "lodash";

import InvoiceView from './invoice/InvoiceView';
import CurrentData from './invoice/CurrentData';

import ReactToPrint from 'react-to-print';

class Invoice extends Component {

	constructor(props) {
		super(props);
		
		const date = new Date();
		const dueDate = new Date();
		dueDate.setDate(dueDate.getDate() +10);
		
		this.state = {
			formState: true,
			
			current: {
				pos1: {
					income: '',
					description: 'Consulting Services',
					euroPerHour: 21.25,
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
			]
		};

		this.secret = localStorage.getItem("ef_secret");

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


	componentDidMount(){

	}

	componentDidUpdate(prevProps, prevState, snapshot){

		if(prevProps?.data?.efficiency && prevProps?.data?.efficiency !== this.state.current.pos1.efficiency){
			this.setState({ 
				current: { 
					...this.state.current,
					pos1: {
						...this.state.current.pos1,
						efficiency: prevProps.data.efficiency
					}
				}
			});
		}

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

				<div className="text-right error">
					<ReactToPrint
						content={() => this.componentRef}
						trigger={() => <button className="">Print to PDF!</button>}
					/>
				</div>

				<InvoiceView 
					ref={el => (this.componentRef = el)}
					date={{month: this.props.data.user.month, year: this.props.data.user.year}} 
					current={this.state.current}
					fieldsWithError={this.state.fieldsWithError}
					invoice={this.props.data?.user?.savedData?.value?.invoice}
				/>

				<div className="text-right">
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