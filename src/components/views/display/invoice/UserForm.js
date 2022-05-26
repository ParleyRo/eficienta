import {Component} from 'react';

class UserForm extends Component {

	render(){

		return (
		
			<div className="row is-flex">
				<div className="col">

					<form onSubmit={this.props.handleSubmit} className={this.props.formState?'':'error'}>
						<div className="row is-flex">
							<div className="col">
							
								<h3 className="title">Your data</h3>

							</div>
						</div>

						<div className="row is-flex">
							<div className="col">
								<label>
									<div>Company Name: </div>
									<input className="large" type="text" value={this.props.general.companyName || ''} data-state-location="general.companyName" onChange={this.props.handleChange} required />
								</label>
							</div>

							<div className="col">
								<label>
									<div>Company Registration Number: </div>
									<input className="large" type="text" value={this.props.general.companyRegistrationNumber || ''} data-state-location="general.companyRegistrationNumber" onChange={this.props.handleChange} required />
								</label>
							</div>
						</div>

						<div className="row is-flex">
							<div className="col">
								<label>
									<div>VAT number: </div>
									<input className="large" type="text" value={this.props.general.companyVatNumber || ''} data-state-location="general.companyVatNumber" onChange={this.props.handleChange} required />
								</label>
							</div>

							<div className="col">
								<label>
									<div>Address: </div>
									<input className="large" type="text" value={this.props.general.companyAddress || ''} data-state-location="general.companyAddress" onChange={this.props.handleChange} required />
								</label>
							</div>
						</div>


						<div className="row is-flex">
							<div className="col">
								<label>
									<div>Phone: </div>
									<input className="large" type="text" value={this.props.general.companyPhone || ''} data-state-location="general.companyPhone" onChange={this.props.handleChange} required />
								</label>
							</div>

							<div className="col">
								<label>
									<div>Email: </div>
									<input className="large" type="text" value={this.props.general.companyEmail || ''} data-state-location="general.companyEmail" onChange={this.props.handleChange} required />
								</label>
							</div>
						</div>

						<div className="row is-flex">
							<div className="col">
								<label>
									<div>Bank: </div>
									<input className="large" type="text" value={this.props.general.companyBank || ''} data-state-location="general.companyBank" onChange={this.props.handleChange} required />
								</label>
							</div>

							<div className="col">
								<label>
									<div>Swift: </div>
									<input className="large" type="text" value={this.props.general.companySwift || '' } data-state-location="general.companySwift" onChange={this.props.handleChange} required />
								</label>
							</div>
						</div>

						<div className="row is-flex">
							<div className="col">
								<label>
									<div>Iban: </div>
									<input className="large" type="text" value={this.props.general.companyIban || ''} data-state-location="general.companyIban" onChange={this.props.handleChange} required />
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

						<div className="row is-flex">
							<div className="col">
								<label>
									<div>Company Name: </div>
									<input className="large" type="text" value={this.props.buyer.companyName || ''} data-state-location="buyer.companyName" onChange={this.props.handleChange} required />
								</label>
							</div>

							<div className="col">
								<label>
									<div>Company Id: </div>
									<input className="large" type="text" value={this.props.buyer.companyId || ''} data-state-location="buyer.companyId" onChange={this.props.handleChange} required />
								</label>
							</div>

							<div className="col">
								<label>
									<div>Company Address: </div>
									<input className="large" type="text" value={this.props.buyer.companyAddress || ''} data-state-location="buyer.companyAddress" onChange={this.props.handleChange} required />
								</label>
							</div>
						</div>


						<div className="row is-flex">
							<div className="col">

								<input type="submit" value="Submit" />
							
							</div>
						</div>
						
						
					</form>

				</div>
			</div>
		
		)
	
	}

}

export default UserForm;