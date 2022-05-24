import {Component} from 'react';
import ItemLoading from '../ItemLoading';
import _ from "lodash";

class Invoice extends Component {


	constructor(props) {
		super(props);
		
		this.state = {
			general: {
				companyName: null,
				companyRegistrationNumber: null,
				companyVatNumber: null,
				companyAddress: null,
				companyPhone: null,
				companyEmail: null,
				companyBank: null,
				companySwift: null
			}
		};

		this.secret = localStorage.getItem("ef_secret");

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {

		_.set(this.state, event.target.dataset.stateLocation, event.target.value.trim());
		

		this.setState(this.state);
	}

	async handleSubmit(event) {

		event.preventDefault();

		const url = `${window.location.protocol}//${window.location.hostname}:5001/save`;

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({secret: this.secret, invoice: this.state})
		});

		const result = await res.json();

		console.log(result);
	}

	componentDidMount(){
		
		
	}

	render(){

		const companyName = this.props.data?.user?.savedData?.value?.invoice?.general?.companyName;
		const companyRegistrationNumber = this.props.data?.user?.savedData?.value?.invoice?.general?.companyRegistrationNumber;
		const companyVatNumber = this.props.data?.user?.savedData?.value?.invoice?.general?.companyVatNumber;
		const companyAddress = this.props.data?.user?.savedData?.value?.invoice?.general?.companyAddress;
		const companyPhone = this.props.data?.user?.savedData?.value?.invoice?.general?.companyPhone;
		const companyEmail = this.props.data?.user?.savedData?.value?.invoice?.general?.companyEmail;
		const companyBank = this.props.data?.user?.savedData?.value?.invoice?.general?.companyBank;
		const companySwift = this.props.data?.user?.savedData?.value?.invoice?.general?.companySwift;
		const companyIban = this.props.data?.user?.savedData?.value?.invoice?.general?.companyIban;

		return (
			<div className="invoice">

				Pîrloagă Cristian-ionuț Persoană Fizică Autorizată
				Company Registration Number: F40/2909/2021
				VAT number: 45195026
				Address: Str. Burdujeni, 16, Bl:n14, Sc:a, Et:4, Ap:10, -, București
				Bucuresti, jud. Bucharest, România
				Phone: 0723570494
				Email: cristian.pirloaga@gmail.com
				Bank: Revolut
				SWIFT: REVOLT21
				IBAN(EUR): LT303250019381864797

				<div className="row is flex">
					<div className="col">
						<h2 className="title">Invoice <ItemLoading /></h2>

					</div>
				</div>

				<div className="row is flex">
					<div className="col">

						<form onSubmit={this.handleSubmit}>

							<div className="row is-flex">
								<div className="col">
									<label>
										<span>Company Name: </span>
										<input type="text" value={this.state.general.companyName == null ? (companyName || '') : this.state.general.companyName} data-state-location="general.companyName" onChange={this.handleChange} required />
									</label>
								</div>
							</div>

							<div className="row is-flex">
								<div className="col">
									<label>
										<span>Company Registration Number: </span>
										<input type="text" value={this.state.general.companyRegistrationNumber == null ? (companyRegistrationNumber || '') : this.state.general.companyRegistrationNumber} data-state-location="general.companyRegistrationNumber" onChange={this.handleChange} required />
									</label>
								</div>
							</div>

							<div className="row is-flex">
								<div className="col">
									<label>
										<span>VAT number: </span>
										<input type="text" value={this.state.general.companyVatNumber == null ? (companyVatNumber || '') : this.state.general.companyVatNumber} data-state-location="general.companyVatNumber" onChange={this.handleChange} required />
									</label>
								</div>
							</div>

							<div className="row is-flex">
								<div className="col">
									<label>
										<span>Address: </span>
										<input type="text" value={this.state.general.companyAddress == null ? (companyAddress || '') : this.state.general.companyAddress} data-state-location="general.companyAddress" onChange={this.handleChange} required />
									</label>
								</div>
							</div>

							<div className="row is-flex">
								<div className="col">
									<label>
										<span>Phone: </span>
										<input type="text" value={this.state.general.companyPhone == null ? (companyPhone || '') : this.state.general.companyPhone} data-state-location="general.companyPhone" onChange={this.handleChange} required />
									</label>
								</div>
							</div>

							<div className="row is-flex">
								<div className="col">
									<label>
										<span>Email: </span>
										<input type="text" value={this.state.general.companyEmail == null ? (companyEmail || '') : this.state.general.companyEmail} data-state-location="general.companyEmail" onChange={this.handleChange} required />
									</label>
								</div>
							</div>

							<div className="row is-flex">
								<div className="col">
									<label>
										<span>Bank: </span>
										<input type="text" value={this.state.general.companyBank == null ? (companyBank || '') : this.state.general.companyBank} data-state-location="general.companyBank" onChange={this.handleChange} required />
									</label>
								</div>
							</div>

							<div className="row is-flex">
								<div className="col">
									<label>
										<span>Swift: </span>
										<input type="text" value={this.state.general.companySwift == null ? (companySwift || '') : this.state.general.companySwift} data-state-location="general.companySwift" onChange={this.handleChange} required />
									</label>
								</div>
							</div>

							<div className="row is-flex">
								<div className="col">
									<label>
										<span>Iban: </span>
										<input type="text" value={this.state.general.companyIban == null ? (companyIban || '') : this.state.general.companyIban} data-state-location="general.companyIban" onChange={this.handleChange} required />
									</label>
								</div>
							</div>


							<input type="submit" value="Submit" />
						</form>

					</div>
				</div>
				
			</div>
		)
	}
}

export default Invoice