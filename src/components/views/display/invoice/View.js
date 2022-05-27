import {Component} from 'react';

class ViewInvoice extends Component {

	constructor(props) {
		super(props);

		this.state = {
			
		}
	}


	render(){

		return(

			<div className="InvoiceContent">

				<div className="invoiceHeader">
					<div className="row is-flex">
						<div className="col">
							<h2 className="turquoise">{this.props.general.companyName}</h2>

							<p>
								Company Registration Number: <b>{this.props.general.companyRegistrationNumber}</b>
							</p>
							<p>
								VAT number: <b>{this.props.general.companyVatNumber}</b>
							</p>
							<p>
								Address: <b>{this.props.general.companyAddress}</b>
							</p>
							<p>
								Phone: <b>{this.props.general.companyPhone}</b>
							</p>
							<p>
								Email: <b>{this.props.general.companyEmail}</b>
							</p>
							<p>
								Bank: <b>{this.props.general.companyBank}</b>
							</p>
							<p>
								SWIFT: <b>{this.props.general.companySwift}</b>
							</p>
							<p>
								IBAN(EUR): <b>{this.props.general.companyIban}</b>
							</p>
						</div>
					</div>
				</div>

				<br />
				<div className="invoiceBody">

					<div className="row is-flex">
						<div className="col">
							
							<h3 className="turquoise">INVOICE / FACTURĂ</h3>
							
							<p className={this.props.fieldsWithError.includes('invoiceNumber') || this.props.current.invoiceNumber == null ? 'red error' : ''}>
								Invoice-Number: <b>{this.props.current.invoiceNumber}</b>
							</p>

							<p className={this.props.fieldsWithError.includes('invoiceDate') ? 'red error' : ''}>
								Invoice-Datee(dd/mm/yyyy): <b>{this.props.current.invoiceDate}</b>
							</p>

							<p className={this.props.fieldsWithError.includes('invoiceDueDate')? ' red error' : ''}>
								Due-Datee(dd/mm/yyyy): <b>{this.props.current.invoiceDueDate}</b>
							</p>

						</div>

						<div className="col">
							<p><b>Buyer / Cumpărător:</b></p>
							<h3 className="turquoise">{this.props.buyer.companyName}</h3>
							<p>
								Company ID: <b>{this.props.buyer.companyId}</b>
							</p>
							<p>
								Address: <b>{this.props.buyer.companyAddress}</b>
							</p>

						</div>
					</div>

					
					<div className="row is-flex text-center">
						<div className="col">
							<table>
								<thead>
									<tr>
										<th>Pos no.</th>
										<th>Description<br />(Denumirea produselor sau a serviciilor)</th>
										<th>Unit<br />(U.M.)</th>
										<th>Quantity<br />(Cantitate)</th>
										<th>Unit price<br />-EUR</th>
										<th>Total Amount<br />-EUR</th>
									</tr>
								</thead>

								<tbody>
									<tr>
										<td>1</td>
										<td>{this.props.current.pos1.description}</td>
										<td>1</td>
										<td>1</td>
										<td>{(this.props.current.pos1.efficiency * this.props.current.pos1.income) / 100}</td>
										<td>{(this.props.current.pos1.efficiency * this.props.current.pos1.income) / 100}</td>
									</tr>

									{this.props.current.pos2.active && <tr>
										<td>2</td>
										<td>{this.props.current.pos2.description}</td>
										<td>1</td>
										<td>1</td>
										<td>{this.props.current.pos2.amount}</td>
										<td>{this.props.current.pos2.amount}</td>
									</tr>}

									{this.props.current.pos3.active && <tr>
										<td>3</td>
										<td>{this.props.current.pos3.description}</td>
										<td>1</td>
										<td>1</td>
										<td>{this.props.current.pos3.amount}</td>
										<td>{this.props.current.pos3.amount}</td>
									</tr>}
								</tbody>
							
							</table>
						</div>
					</div>

					<div className="row is-flex">
						<div className="col">
							<p>Invoice {this.props.date.month} {this.props.date.year}</p>
							<p>{this.props.current.pos1.euroPerHour} eur / hour * {(((this.props.current.pos1.efficiency * this.props.current.pos1.income) / 100) / this.props.current.pos1.euroPerHour).toFixed(2)} hours = {(this.props.current.pos1.efficiency * this.props.current.pos1.income) / 100} euro</p>
						</div>
					</div>
					
				</div>

				<div className="invoiceFooter">
					
					<div className="row is-flex">

						<div className="col">
							<p><small>{this.props.general.companyName}</small></p>
							<p><small>Company Registration Number: {this.props.general.companyRegistrationNumber}</small></p>
							<p><small>VAT number: {this.props.general.companyVatNumber}</small></p>
							<p><small>Address: {this.props.general.companyAddress}</small></p>
						</div>
					
						<div className="col">
							<p><small>Phone: {this.props.general.companyPhone}</small></p>
							<p><small>Email: {this.props.general.companyEmail}</small></p>
						</div>
					
						<div className="col">
							<p><small>Bank: {this.props.general.companyBank}</small></p>
							<p><small>SWIFT: {this.props.general.companySwift}</small></p>
							<p><small>IBAN(EUR): {this.props.general.companyIban}</small></p>
						</div>

					</div>

				</div>
			</div>
		)
	}
}

export default ViewInvoice
