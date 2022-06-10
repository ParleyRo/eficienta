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
		
	}
	
	closeActive(event){

		this.setState({activeInnvoice: 0});
	}
	addActive(event){

		this.setState({activeInnvoice: event.currentTarget.dataset.key});

	}

	render(){

		this.totalInvoices = 0;
		this.index = 0;
		
		const invoicesDates = Object.keys(this.props.data.user.invoices).map((year)=>{
			
			return Object.keys(this.props.data.user.invoices[year]).map((month) => {
				
				this.totalInvoices++;
				
				return {
					year: year,
					month: month
				}
			});
		
		});
        
		const unitCm = 37; //1cm = 37px

		const smallPaperHeight =  (((this.totalInvoices % 3)+1) * (unitCm * 26.2 * 0.33) + ((this.totalInvoices % 3)+1) * 16)

		return(
				
				<div className="invoicesContainer custom-scroll" style={{minHeight: smallPaperHeight+'px'}}>
					{	this.props.data.user.invoices != null && 
						invoicesDates.map(invoiceDateList=>{
							
							return invoiceDateList.map((invoiceDate)=>{

								
								const xPosition = this.index % 3;
								const yPosition = Math.floor(this.index / 3);
																
								const left = `calc((-1) * (100% - 21cm) + (((21cm + ((100% - 21cm) / 3) ) * 0.33 * ${xPosition})) - 1.5rem)`;
								const top = `calc((-1) * (26.2cm * 0.33) + (26.2cm * 0.33 * ${yPosition}) ${yPosition > 0 ? '+ 2.5rem' : ''})`;
								
								this.index++;
								
								return <div className={(this.state.activeInnvoice == this.index ? 'active' : '') + ' invoiceContainer'} onClick={this.addActive} data-key={this.index} key={this.index} style={{left: left, top: top}}>

											<div className="text-right actions">
												<button className="button is-danger">Delete</button>
												<button className="button" onClick={this.closeActive}>Ⓧ</button>
											</div>
											
											<h1 className="text-center">{invoiceDate.year} - {invoiceDate.month}</h1>

											<InvoiceView 
												
												date={{
													month: invoiceDate.month,
													year: invoiceDate.year
												}} 
												current={this.props.data.user.invoices[invoiceDate.year][invoiceDate.month].current}
												fieldsWithError={[]}
												invoice={{
													general: this.props.data.user.invoices[invoiceDate.year][invoiceDate.month].general,
													buyer: this.props.data.user.invoices[invoiceDate.year][invoiceDate.month].buyer
												}}
												rate={this.props.data.user.invoices[invoiceDate.year][invoiceDate.month].rates}
												efficiency={this.props.data.user.invoices[invoiceDate.year][invoiceDate.month].efficiency}
											/> 
									</div>
							
							});

						})
					}
				</div>
				
			
		
		)
	
	}
}


export default Invoices;