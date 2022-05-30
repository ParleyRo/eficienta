import {Component} from 'react';
import ItemLoading from '../ItemLoading';
import _ from "lodash";

import InvoiceView from './invoice/View';
import CurrentData from './invoice/CurrentData';

import ReactToPrint from 'react-to-print';

class Invoice extends Component {

	constructor(props) {
		super(props);
		
		const date = new Date();
		const dueDate = new Date();
		dueDate.setDate(dueDate.getDate() +10);
		
		this.state = {
			ajaxLoading: false,
			formState: true,
			general: {
				companyName: null,
				companyRegistrationNumber: null,
				companyVatNumber: null,
				companyAddress: null,
				companyPhone: null,
				companyEmail: null,
				companyBank: null,
				companySwift: null,
				companyIban: null
			},
			buyer: {
				companyName: null,
				companyId: null,
				companyAddress: null
			},
			current: {
				pos1: {
					income: null,
					description: 'Consulting Services',
					euroPerHour: 21.25,
					efficiency: 0
				},
				pos2: {
					active: false,
					description: null,
					amount: null
				},
				pos3: {
					active: false,
					description: null,
					amount: null
				},
				invoiceNumber: null,
				invoiceDate: `${('0'+date.getDate()).slice(-2)}/${('0'+(date.getMonth()+1)).slice(-2)}/${date.getFullYear()}`,
				invoiceDueDate: `${('0'+dueDate.getDate()).slice(-2)}/${('0'+(dueDate.getMonth()+1)).slice(-2)}/${dueDate.getFullYear()}`,
				
			},
			fieldsWithError:[]
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

	handleChange(event) {

		const value = event.target.value.trim();
		const stateLocation = event.target.dataset.stateLocation;

		const noEmptyFields = [
			'current.invoiceNumber',
			'current.pos1.income','current.pos1.description',
			'current.pos2.amount','current.pos2.description',
			'current.pos3.amount','current.pos3.description'
		]
		if(noEmptyFields.includes(stateLocation)){
			
			if((value === '' || value == null) && !this.state.fieldsWithError.includes(stateLocation)){
				_.set(this.state, 'fieldsWithError', [...this.state.fieldsWithError, stateLocation]);
			}else{
				const fieldsWithError = [...this.state.fieldsWithError];
				const index = fieldsWithError.indexOf(stateLocation);

				if (index > -1) {
					fieldsWithError.splice(index, 1); // 2nd parameter means remove one item only
				}

				_.set(this.state, 'fieldsWithError', fieldsWithError);
			}
		}

		if(['current.invoiceDate','current.invoiceDueDate'].includes(stateLocation)){
			
			const matched  = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

			if(matched == null && !this.state.fieldsWithError.includes(stateLocation)){
				
				_.set(this.state, 'fieldsWithError', [...this.state.fieldsWithError, stateLocation]);
			
			}else{

				const fieldsWithError = [...this.state.fieldsWithError];
				const index = fieldsWithError.indexOf(stateLocation);

				if (index > -1) {
					fieldsWithError.splice(index, 1); // 2nd parameter means remove one item only
				}

				_.set(this.state, 'fieldsWithError', fieldsWithError);
			}
  			//return (m) ? new Date(m[3], m[2]-1, m[1]) : null;
		}
		_.set(this.state, stateLocation, value);
		

		this.setState(this.state);
	}


	componentDidMount(){

		if(this.props?.data?.user?.savedData?.value?.invoice?.general && this.props?.data?.user?.savedData?.value?.invoice?.general !== this.state.general){
			this.setState({general: this.props.data.user.savedData.value.invoice.general || ''})
		}

		if(this.props?.data?.user?.savedData?.value?.invoice?.buyer && this.props?.data?.user?.savedData?.value?.invoice?.buyer !== this.state.buyer){
			this.setState({buyer: this.props.data.user.savedData.value.invoice.buyer || ''})
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot){

		if(prevProps?.data?.user?.savedData?.value?.invoice?.general && prevProps?.data?.user?.savedData?.value?.invoice?.general !== this.state.general){
			this.setState({general: prevProps.data.user.savedData.value.invoice.general || ''})
		}

		if(prevProps?.data?.user?.savedData?.value?.invoice?.buyer && prevProps?.data?.user?.savedData?.value?.invoice?.buyer !== this.state.buyer){
			this.setState({buyer: prevProps.data.user.savedData.value.invoice.buyer || ''})
		}

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

						<h2 className="title">Invoice {this.state.ajaxLoading && <ItemLoading />}</h2>

					</div>
				</div>
				
				<CurrentData 
					current={this.state.current} 
					fieldsWithError={this.state.fieldsWithError} 
					handleChange={this.handleChange}
					addNewPos={this.addNewPos}
				/>

				<hr />
				

				<InvoiceView 
					ref={el => (this.componentRef = el)}
					date={{month: this.props.data.user.month, year: this.props.data.user.year}} 
					general={this.state.general} 
					buyer={this.state.buyer} 
					current={this.state.current}
					fieldsWithError={this.state.fieldsWithError}
				/>

				<ReactToPrint
					content={() => this.componentRef}
					trigger={() => <button className="">Print to PDF!</button>}
				/>


			</div>
				
		)
	}
}

export default Invoice