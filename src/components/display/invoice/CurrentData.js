import {Component} from 'react';

class CurrentData extends Component {

	render(){

		return(

			<div className="scroll-x">
				<div className="row is-flex">
						
					<div className="col">
					
						<div>

							<div className="row is-flex">
								<div className="col">
									<h3 className="col title">Current data</h3>
								</div>

								<div className="col">
									<div className="text-right">
										<label>
											<small>Rate date: {this.props.rate?.date.split('-')[2]}/{this.props.rate?.date.split('-')[1]}/{this.props.rate?.date.split('-')[0]}</small>
											<br />
											<small>{this.props.rate?.data.currency}: {this.props.rate?.data.value}</small>
										</label>
									</div>
								</div>
							</div>

							<div className="row is-flex">
								<div className="col">
									<label>
										<div>Invoice number: </div>
										<input className={'large ' + (this.props.fieldsWithError.includes('current.invoiceNumber') ? 'error':'')} type="text" value={this.props.current.invoiceNumber} data-state-location="current.invoiceNumber" onChange={this.props.handleChange} required />
									</label>
								</div>
								
								<div className="col auto">
									<label>
										<div>Invoice date: <small>(dd/mm/yyyy)</small></div>
										<input className={'large ' + (this.props.fieldsWithError.includes('current.invoiceDate') ? 'error' : '')} type="text" value={this.props.current.invoiceDate} onBlur={this.props.getRate} data-type="date" data-state-location="current.invoiceDate" onChange={this.props.handleChange} required />
									</label>
								</div>

								<div className="col auto">
									<label>
										<div>Invoice due date: <small>(dd/mm/yyyy)</small></div>
										<input className={'large ' + (this.props.fieldsWithError.includes('current.invoiceDueDate') ? 'error' : '')} type="text" value={this.props.current.invoiceDueDate} data-type="date" data-state-location="current.invoiceDueDate" onChange={this.props.handleChange} required />
									</label>
								</div>

							</div>

							<div className="pos1 row is-flex va-center">
								
								<div className="col auto">
									Pos no.1
								</div>

								<div className="col auto">
									<label>
										<div>Description:</div>
										<input className={'large ' + (this.props.fieldsWithError.includes('current.pos1.description') ? 'error' : '')} type="text" value={this.props.current.pos1.description} data-state-location="current.pos1.description" onChange={this.props.handleChange} required />
									</label>
								</div>

								<div className="col auto">
									<label>
										<div>Your Income: </div>
										<input data-type="number" className={'large ' + (this.props.fieldsWithError.includes('current.pos1.income') ? 'error' : '')} type="text" value={this.props.current.pos1.income} data-state-location="current.pos1.income" onChange={this.props.handleChange} required />
									</label>
								</div>

								<div className="col auto">
									{(this.props.current.pos3.active === false ) &&<button data-pos="2" onClick={this.props.addNewPos}>{this.props.current.pos2.active ? 'Remove pos 2' : 'Add new pos'}</button>}
								</div>

							</div>

							{this.props.current.pos2.active && <div className="pos2 row is-flex va-center">
								
								<div className="col auto">
									Pos no.2
								</div>

								<div className="col auto">
									<label>
										<div>Description:</div>
										<input className={'large ' + (this.props.fieldsWithError.includes('current.pos2.description') ? 'error' : '')} type="text" value={this.props.current.pos2.description} data-state-location="current.pos2.description" onChange={this.props.handleChange} required />
									</label>
								</div>

								<div className="col auto">
									<label>
										<div>Amount: </div>
										<input className={'large ' + (this.props.fieldsWithError.includes('current.pos2.amount')? 'error' : '')} type="text" value={this.props.current.pos2.amount} data-state-location="current.pos2.amount" onChange={this.props.handleChange} required />
									</label>
								</div>

								<div className="col auto">
									<button data-pos="3" onClick={this.props.addNewPos}>{this.props.current.pos3.active ? 'Remove pos 3' : 'Add new pos'} </button>
								</div>

							</div>}

							{this.props.current.pos3.active && <div className="pos3 row is-flex va-center">
								
								<div className="col auto">
									Pos no.3
								</div>

								<div className="col auto">
									<label>
										<div>Description:</div>
										<input className={'large ' + (this.props.fieldsWithError.includes('current.pos3.description') ? 'error' : '')} type="text" value={this.props.current.pos3.description || ''} data-state-location="current.pos3.description" onChange={this.props.handleChange} required />
									</label>
								</div>

								<div className="col auto">
									<label>
										<div>Amount: </div>
										<input className={'large ' + (this.props.fieldsWithError.includes('current.pos3.amount') ? 'error' : '')} type="text" value={this.props.current.pos3.amount || ''} data-state-location="current.pos3.amount" onChange={this.props.handleChange} required />
									</label>
								</div>

							</div>}
							

						</div>
					</div>
				</div>
			</div>
		
		)
	
	
	}
}

export default CurrentData