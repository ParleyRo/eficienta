import {Component} from 'react';

import _ from "lodash";

class InvoiceData extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			ajaxLoading: false,
			formState: true,
			general: {
				companyName: props.data.user.invoice?.general?.companyName || '',
				companyRegistrationNumber: props.data.user.invoice?.general?.companyRegistrationNumber || '',
				companyVatNumber: props.data.user.invoice?.general?.companyVatNumber || '',
				companyAddress: props.data.user.invoice?.general?.companyAddress || '',
				companyPhone: props.data.user.invoice?.general?.companyPhone || '',
				companyEmail: props.data.user.invoice?.general?.companyEmail || '',
				companyBank: props.data.user.invoice?.general?.companyBank || '',
				companySwift: props.data.user.invoice?.general?.companySwift || '',
				companyIban: props.data.user.invoice?.general?.companyIban || ''
			},
			buyer: {
				companyName: props.data.user.invoice?.buyer?.companyName || '',
				companyId: props.data.user.invoice?.buyer?.companyId || '',
				companyAddress: props.data.user.invoice?.buyer?.companyAddress || ''
			},
			fieldsWithError:[]
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(event) {

		event.preventDefault();

		let isValid = true;

		for (const [key] of Object.entries(this.state.general)) {

			if(this.state.general[key] === ''){
				isValid = false;
			}
		}

		for (const [key] of Object.entries(this.state.buyer)) {

			if(this.state.buyer[key] === ''){
				isValid = false;
			}
		}
		
		if(!isValid){
			this.setState({formState: false})
			return;
		}
		
		this.setState({ajaxLoading: true})
		
		const url = `${window.location.protocol}//${window.location.hostname}:4000/save`;
		
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				secret: this.props.data.user.secret, 
				invoice: {
					general: this.state.general,
					buyer: this.state.buyer
				}
			})
		});

		const result = await res.json();
		
		this.setState({ajaxLoading: false})

		if(result.success){
			this.props.changedData({
				invoice: {
					general: this.state.general,
					buyer: this.state.buyer
				}
			});
		}
	}

	handleChange(event) {

		const value = event.target.value.trim();
		const stateLocation = event.target.dataset.stateLocation;
			
		if((value === '') && !this.state.fieldsWithError.includes(stateLocation)){
			_.set(this.state, 'fieldsWithError', [...this.state.fieldsWithError, stateLocation]);
		}else{
			const fieldsWithError = [...this.state.fieldsWithError];
			const index = fieldsWithError.indexOf(stateLocation);

			if (index > -1) {
				fieldsWithError.splice(index, 1); // 2nd parameter means remove one item only
			}

			_.set(this.state, 'fieldsWithError', fieldsWithError);
		}

		_.set(this.state, stateLocation, value);

		this.setState(this.state);
	}

	render(){

		return (
			<>
				<div className="row is-flex">

					<div className="col">

						<h2 className="title">Invoice</h2>

					</div>
				</div>
				
				<div className="row is-flex">

					
					<div className="col">

						<form onSubmit={this.handleSubmit} className={this.state.formState?'':'error'}>
							<div className="row is-flex">
								<div className="col">
								
									<h3 className="title">Your company data</h3>

								</div>
							</div>

							<div className="row is-flex va-end">
								<div className="col">
									<label>
										<div>Company Name: </div>
										<input className="large" type="text" value={this.state.general.companyName} data-state-location="general.companyName" onChange={this.handleChange} required />
									</label>
								</div>

								<div className="col">
									<label>
										<div>Company Registration Number: </div>
										<input className="large" type="text" value={this.state.general.companyRegistrationNumber} data-state-location="general.companyRegistrationNumber" onChange={this.handleChange} required />
									</label>
								</div>
							</div>

							<div className="row is-flex va-end">
								<div className="col">
									<label>
										<div>VAT number: </div>
										<input className="large" type="text" value={this.state.general.companyVatNumber} data-state-location="general.companyVatNumber" onChange={this.handleChange} required />
									</label>
								</div>

								<div className="col">
									<label>
										<div>Address: </div>
										<input className="large" type="text" value={this.state.general.companyAddress} data-state-location="general.companyAddress" onChange={this.handleChange} required />
									</label>
								</div>
							</div>


							<div className="row is-flex va-end">
								<div className="col">
									<label>
										<div>Phone: </div>
										<input className="large" type="text" value={this.state.general.companyPhone} data-state-location="general.companyPhone" onChange={this.handleChange} required />
									</label>
								</div>

								<div className="col">
									<label>
										<div>Email: </div>
										<input className="large" type="text" value={this.state.general.companyEmail} data-state-location="general.companyEmail" onChange={this.handleChange} required />
									</label>
								</div>
							</div>

							<div className="row is-flex va-end">
								<div className="col">
									<label>
										<div>Bank: </div>
										<input className="large" type="text" value={this.state.general.companyBank} data-state-location="general.companyBank" onChange={this.handleChange} required />
									</label>
								</div>

								<div className="col">
									<label>
										<div>Swift: </div>
										<input className="large" type="text" value={this.state.general.companySwift} data-state-location="general.companySwift" onChange={this.handleChange} required />
									</label>
								</div>
							</div>

							<div className="row is-flex va-end">
								<div className="col">
									<label>
										<div>Iban: </div>
										<input className="large" type="text" value={this.state.general.companyIban} data-state-location="general.companyIban" onChange={this.handleChange} required />
									</label>
								</div>

								<div className="col">
								</div>
							</div>

							<div className="row is-flex">
								<div className="col">
								
									<h3 className="title">Buyer data</h3>

								</div>
							</div>

							<div className="row is-flex va-end">
								<div className="col">
									<label>
										<div>Company Name: </div>
										<input className="large" type="text" value={this.state.buyer.companyName || ''} data-state-location="buyer.companyName" onChange={this.handleChange} required />
									</label>
								</div>

								<div className="col">
									<label>
										<div>Company Id: </div>
										<input className="large" type="text" value={this.state.buyer.companyId || ''} data-state-location="buyer.companyId" onChange={this.handleChange} required />
									</label>
								</div>

								<div className="col">
									<label>
										<div>Company Address: </div>
										<input className="large" type="text" value={this.state.buyer.companyAddress || ''} data-state-location="buyer.companyAddress" onChange={this.handleChange} required />
									</label>
								</div>
							</div>


							<div className="row is-flex va-end">
								<div className="col text-right">

									<input type="submit" value="Submit" />
								
								</div>
							</div>
							
							
						</form>

					</div>
				</div>
			</>
		
		)
	
	}

}

export default InvoiceData;