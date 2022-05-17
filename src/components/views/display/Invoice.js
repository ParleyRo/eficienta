import {Component} from 'react';
import ItemLoading from '../ItemLoading';

class Invoice extends Component {

	constructor(props) {
		super(props);
		
		this.sendEmail = this.sendEmail.bind(this);
	}

	sendEmail(){

		console.log(this.props)
		console.log('clicked')

	}

	render(){
	
		return (
			<div className="invoice">
				<div className="row is flex">
					<div className="col">
						<h2 className="title">Invoice <ItemLoading /></h2>

						<button onClick={this.sendEmail}>Send email</button>
					</div>
				</div>
				
			</div>
		)
	}
}

export default Invoice