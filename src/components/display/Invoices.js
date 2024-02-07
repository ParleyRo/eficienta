import {Component} from 'react';

import InvoiceView from './invoice/InvoiceView';
class Invoices extends Component {
	
	constructor(props) {

		super(props);

		this.state = {
			activeInnvoice: 0
		}

		this.totalInvoices = 0;
		this.index = 0;

		this.addActive = this.addActive.bind(this);
		this.closeActive = this.closeActive.bind(this);
		this.deleteActive = this.deleteActive.bind(this);

	}

	async deleteActive(event){

		if(!window.confirm('Are you sure about deleting this invoice ?!!!')){
			return; 
		}

		const data = {
			secret: this.props.data.user.secret,
			year: event.currentTarget.dataset.year,
			month: event.currentTarget.dataset.month
		}

		const url = `${window.location.protocol}//${window.location.hostname}:3001/delete`;

		const res = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		await res.json();

		this.props.changedData({invoicesDelete:{year: data.year, month: data.month}});

		this.setState({activeInnvoice: 0});
		
	}
	closeActive(event){

		this.setState({activeInnvoice: 0});
	}
	addActive(event){

		if(event.target.tagName.toLowerCase() === 'button'){
			return;
		}

		this.setState({activeInnvoice: parseInt(event.currentTarget.dataset.key)});
	}

	render(){

		this.totalInvoices = 0;
		this.index = 0;

		return(
				
				<div className="invoicesContainer custom-scroll" >
					{	this.props.data.user.invoices != null && 
						Object.keys(this.props.data.user.invoices || {}).reverse().map((invoiceNumber)=>{

								const xPosition = this.index % 3;
								const yPosition = Math.floor(this.index / 3);

								const rowPosition = Math.ceil((this.index + 1) / 3) - 1;

								const left = `calc((-1) * (100% - 21cm) + (((21cm + ((100% - 21cm) / 3) ) * 0.33 * ${xPosition})) - 1.5rem)`;
								const top = `calc((-1) * (26.2cm * 0.33) + (26.2cm * 0.33 * ${yPosition})  + ( ${rowPosition} * 3rem ) )`;

								this.index++;

								return <div className={(this.state.activeInnvoice === this.index ? 'active' : '') + ' invoiceContainer'} onClick={this.addActive} data-key={this.index} key={this.index} style={{left: left, top: top}}>

											<div className="text-right actions">
												<button className="button is-danger" data-year={this.props.data.user.invoices[invoiceNumber].invoicedAt.year} data-month={this.props.data.user.invoices[invoiceNumber].invoicedAt.month} onClick={this.deleteActive}>Delete</button>
												<button className="button" onClick={this.closeActive}>Ⓧ</button>
											</div>
											
											<h1 className="text-center">{this.props.data.user.invoices[invoiceNumber].invoicedAt.year} - {this.props.data.user.invoices[invoiceNumber].invoicedAt.month}</h1>

											<InvoiceView 
												ref={el => (this.componentRef = el)}
												date={{
													month: this.props.data.user.invoices[invoiceNumber].invoicedAt.month,
													year: this.props.data.user.invoices[invoiceNumber].invoicedAt.year
												}} 
												current={this.props.data.user.invoices[invoiceNumber].current}
												fieldsWithError={[]}
												invoice={{
													general: this.props.data.user.invoices[invoiceNumber].general,
													buyer: this.props.data.user.invoices[invoiceNumber].buyer
												}}
												rate={this.props.data.user.invoices[invoiceNumber].rate}
												efficiency={this.props.data.user.invoices[invoiceNumber].efficiency}
											/> 
									</div>
							

						})
					}
				</div>
				
			
		
		)
	
	}
}


export default Invoices;