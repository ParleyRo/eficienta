import {Component} from 'react';

class ViewInvoice extends Component {

	addCommaToLargeNumbers(number){

		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	render(){

		const totalAmount = parseInt(((this.props.efficiency?.total * this.props.current?.pos1?.income||0) / 100)) 
			+ parseInt(this.props.current?.pos2?.active ? this.props.current?.pos2?.amount || 0 : 0) 
			+ parseInt(this.props.current?.pos3?.active ? this.props.current?.pos3?.amount || 0 : 0);

		const emptyFieldText = '...empty';
		
		return(

			<div className="scroll-x">
			
				<div className="InvoiceContent">

					<div className="invoiceHeader">

						<div className="row is-flex">

							<div className="col">
								<h2 className={this.props.invoice?.general?.companyName ? 'turquoise' : 'red'}>{this.props.invoice?.general?.companyName || 'Company Name Here'}</h2>

								<p className={this.props.invoice?.general?.companyRegistrationNumber ? '' : 'red'}>
									Company Registration Number: <b>{this.props.invoice?.general?.companyRegistrationNumber || emptyFieldText}</b>
								</p>
								<p className={this.props.invoice?.general?.companyVatNumber ? '' : 'red'}>
									VAT number: <b>{this.props.invoice?.general?.companyVatNumber || emptyFieldText}</b>
								</p>
								<p className={this.props.invoice?.general?.companyAddress ? '' : 'red'}>
									Address: <b>{this.props.invoice?.general?.companyAddress || emptyFieldText}</b>
								</p>
								<p className={this.props.invoice?.general?.companyPhone ? '' : 'red'}>
									Phone: <b>{this.props.invoice?.general?.companyPhone || emptyFieldText}</b>
								</p>
								<p className={this.props.invoice?.general?.companyEmail ? '' : 'red'}>
									Email: <b>{this.props.invoice?.general?.companyEmail || emptyFieldText}</b>
								</p>
								<p className={this.props.invoice?.general?.companyBank ? '' : 'red'}>
									Bank: <b>{this.props.invoice?.general?.companyBank || emptyFieldText}</b>
								</p>
								<p className={this.props.invoice?.general?.companySwift ? '' : 'red'}>
									SWIFT: <b>{this.props.invoice?.general?.companySwift || emptyFieldText}</b>
								</p>
								<p className={this.props.invoice?.general?.companyIban ? '' : 'red'}>
									IBAN(EUR): <b>{this.props.invoice?.general?.companyIban || emptyFieldText}</b>
								</p>
							</div>
						</div>
					</div>

					<br />
					<div className="invoiceBody">

						<div className="row is-flex">
							<div className="col">
								
								<h3 className="turquoise">INVOICE / FACTURĂ</h3>
								
								<p className={this.props.fieldsWithError.includes('current.invoiceNumber') ? 'red error' : ''}>
									Invoice-Number: <b>{this.props.current?.invoiceNumber||''}</b>
								</p>

								<p className={this.props.fieldsWithError.includes('invoiceDate') ? 'red error' : ''}>
									Invoice-Date(dd/mm/yyyy): <b>{this.props.current?.invoiceDate}</b>
								</p>

								<p className={this.props.fieldsWithError.includes('invoiceDueDate')? ' red error' : ''}>
									Due-Date(dd/mm/yyyy): <b>{this.props.current?.invoiceDueDate}</b>
								</p>

							</div>

							<div className="col">
								
								<p><b>Buyer / Cumpărător:</b></p>
								
								<h3 className={this.props.invoice?.buyer?.companyName ? 'turquoise' : 'red'}>{this.props.invoice?.buyer?.companyName || 'Buyer Company Name Here'}</h3>
								
								<p className={this.props.invoice?.buyer?.companyId ? '' : 'red'}>
									Company ID: <b>{this.props.invoice?.buyer?.companyId || emptyFieldText}</b>
								</p>
								<p className={this.props.invoice?.buyer?.companyAddress ? '' : 'red'}>
									Address: <b>{this.props.invoice?.buyer?.companyAddress || emptyFieldText}</b>
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
											<th>Unit price<br />-EUR-<br/><small><i>-RON-</i></small></th>
											<th>Total Amount<br />-EUR-<br/><small><i>-RON-</i></small></th>
										</tr>
									</thead>

									<tbody>
										<tr>
											<td>1</td>
											<td>{this.props.current?.pos1?.description}</td>
											<td>1</td>
											<td>1</td>
											<td className={this.props.fieldsWithError.includes('current.pos1.income') ? 'red error' : ''}>
												<div>
													<span><b>{this.addCommaToLargeNumbers((this.props.efficiency?.total * this.props.current?.pos1?.income||0) / 100)}</b></span>
													<br />
													<small><i>({ this.addCommaToLargeNumbers(parseFloat(this.props.rate?.data?.value * ((this.props.efficiency?.total * this.props.current?.pos1?.income||0) / 100)).toFixed(2)) })</i></small>
												</div>
												
											</td>
											<td className={this.props.fieldsWithError.includes('current.pos1.income') ? 'red error' : ''}>
												<div>
													<span><b>{this.addCommaToLargeNumbers((this.props.efficiency?.total * this.props.current?.pos1?.income||0) / 100)}</b></span>
													<br />
													<small><i>({ this.addCommaToLargeNumbers(parseFloat(this.props.rate?.data?.value * ((this.props.efficiency?.total * this.props.current?.pos1?.income||0) / 100)).toFixed(2)) })</i></small>
												</div>
											</td>
										</tr>

										{this.props.current?.pos2?.active && <tr>
											<td>2</td>
											<td className={this.props.fieldsWithError.includes('current.pos2.description') ? 'red error' : ''}>{this.props.current?.pos2?.description ? this.props.current.pos2.description : '?????'}</td>
											<td>1</td>
											<td>1</td>
											<td className={this.props.fieldsWithError.includes('current.pos2.amount') ? 'red error' : ''}>
												<div>
													<span><b>{this.addCommaToLargeNumbers( this.props.current?.pos2?.amount )}</b></span>
													<br />
													<small><i>({ this.addCommaToLargeNumbers(parseFloat( this.props.rate?.data?.value * this.props.current.pos2.amount).toFixed(2) )})</i></small>
												</div>
											</td>
											<td className={this.props.fieldsWithError.includes('current.pos2.amount') ? 'red error' : ''}>
												<div>
													<span><b>{this.addCommaToLargeNumbers( this.props.current?.pos2?.amount )}</b></span>
													<br />
													<small><i>({ this.addCommaToLargeNumbers( parseFloat(this.props.rate?.data?.value * this.props.current.pos2.amount).toFixed(2) ) })</i></small>
												</div>
											</td>
										</tr>}

										{this.props.current?.pos3?.active && <tr>
											<td>3</td>
											<td className={this.props.fieldsWithError.includes('current.pos3.description') ? 'red error' : ''}>{this.props.current.pos3.description ? this.props.current.pos3.description : '?????'}</td>
											<td>1</td>
											<td>1</td>
											<td className={this.props.fieldsWithError.includes('current.pos3.amount') ? 'red error' : ''}>
												<div>
													<span><b>{this.addCommaToLargeNumbers( this.props.current?.pos3?.amount )}</b></span>
													<br />
													<small><i>({ this.addCommaToLargeNumbers( parseFloat(this.props.rate?.data?.value * this.props.current?.pos3?.amount).toFixed(2) ) })</i></small>
												</div>
											</td>
											<td className={this.props.fieldsWithError.includes('current.pos3.amount') ? 'red error' : ''}>
												<div>
													<span><b>{this.addCommaToLargeNumbers( this.props.current.pos3.amount )}</b></span>
													<br />
													<small><i>({ this.addCommaToLargeNumbers( parseFloat(this.props.rate?.data?.value * this.props.current?.pos3?.amount).toFixed(2) ) })</i></small>
												</div>
											</td>
										</tr>}
										<tr>
											<td colSpan="5">
												<span><b>Invoice Total -EUR-</b></span>
												<br />
												<small><i>(Valoare totală de plată factura curentă -RON-)</i></small>
											</td>
											<td>
												<div>
													<span><b>{totalAmount}</b></span>
													<br />
													<small><i>({ parseFloat(this.props.rate?.data?.value * totalAmount).toFixed(2) })</i></small>
												</div>
											</td>
										</tr>
									</tbody>
								
								</table>
							</div>
						</div>

						<div className="row is-flex">
							<div className="col">
								<p>Invoice {this.props.date.month} {this.props.date.year}</p>
								<p className={this.props.fieldsWithError.includes('current.pos1.income') ? 'red error' : ''}>{parseFloat((this.props.efficiency?.total * (this.props.current?.pos1?.income || 0) / 100) / 80).toFixed(2)} eur / hour * 80 hours = {(this.props.efficiency?.total * this.props.current?.pos1?.income||0) / 100} euro</p>
							</div>
						</div>
						
					</div>

					<div className="invoiceFooter">
						
						<div className="row is-flex">

							<div className="col">
								<p><small>{this.props.invoice?.general?.companyName}</small></p>
								<p><small>Company Registration Number: {this.props.invoice?.general?.companyRegistrationNumber}</small></p>
								<p><small>VAT number: {this.props.invoice?.general?.companyVatNumber}</small></p>
								<p><small>Address: {this.props.invoice?.general?.companyAddress}</small></p>
							</div>
						
							<div className="col">
								<p><small>Phone: {this.props.invoice?.general?.companyPhone}</small></p>
								<p><small>Email: {this.props.invoice?.general?.companyEmail}</small></p>
							</div>
						
							<div className="col">
								<p><small>Bank: {this.props.invoice?.general?.companyBank}</small></p>
								<p><small>SWIFT: {this.props.invoice?.general?.companySwift}</small></p>
								<p><small>IBAN(EUR): {this.props.invoice?.general?.companyIban}</small></p>
							</div>

						</div>

					</div>
				</div>
			
			</div>
		)
	}
}

export default ViewInvoice

