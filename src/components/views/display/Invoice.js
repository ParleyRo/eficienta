import {Component} from 'react';
import ItemLoading from '../ItemLoading';

class Invoice extends Component {


	constructor(props) {
		super(props);

		this.state = {
			cui: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({cui: event.target.value});
	}

	async handleSubmit(event) {
		console.log(this.state)
		event.preventDefault();

		const res = await fetch(`http://parley.go.ro:5001/`, {
			'Content-Type': 'application/json'
		});

		const result = await res.json();

		console.log(result);
	}

	render(){
	
		return (
			<div className="invoice">
				<div className="row is flex">
					<div className="col">
						<h2 className="title">Invoice <ItemLoading /></h2>

					</div>
				</div>

				<div className="row is flex">
					<div className="col">

						<form onSubmit={this.handleSubmit}>
							
							<label>
								<span>CUI: </span>
								<input type="text" value={this.state.cui} onChange={this.handleChange} />
							</label>

							<input type="submit" value="Submit" />
						</form>

					</div>
				</div>
				
			</div>
		)
	}
}

export default Invoice