import {Component} from 'react';

class UserData extends Component {
	
	constructor(props) {
		super(props);
console.log('userData props,',props.data);
		this.state = {
			secret: props.data.value?.secret,
			apikey: props.data.value?.everhour?.apikey,
			error: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		let fields = {};

		fields[event.target.name] = event.target.value;

		this.setState(fields);

	}

	async handleSubmit(event) {

		event.preventDefault();

		const res = await fetch(`http://parley.go.ro:5001/save`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				secret: this.state.secret,
				everhour: {
					apikey: this.state.apikey
				}
			})
		});

		const result = await res.json();

		if(result.error) {
			this.setState({error: true})
			return;
		}

		localStorage.setItem("ef_secret", this.state.secret);

		return;
	}

	render(){

		return(
			<div className="main">
				
				<form onSubmit={this.handleSubmit}>

					<div className="row is-flex">
						<div className="col">
							<label>
								<span>Secret: </span>
								<input type="text" name="secret" value={this.state.secret} onChange={this.handleChange} required />
							</label>
						</div>
					</div>

					<div className="row is-flex">
						<div className="col">
							<label>
								<span>Everhour apikey: </span>
								<input type="text" name="apikey" value={this.state.apikey} onChange={this.handleChange} required />
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
		);
	}
}

export default UserData;