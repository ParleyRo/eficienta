import {Component} from 'react';

class UserData extends Component {
	
	constructor(props) {
		super(props);
console.log('UserData:',props)
		this.state = {
			secret: '',
			apikey: '',
			error: false
		};
		
		if(props.data?.everhour?.apikey){
			this.state.apikey = props.data?.everhour?.apikey;
		}

		if(props.data?.secret){
			this.state.secret = props.data?.secret;
		}

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
		
		const url = `${window.location.protocol}//${window.location.hostname}:5001/save`;
		
		let data = {
			secret: this.state.secret
		}

		if(this.state.apikey){

			data['everhour'] = {
				apikey: this.state.apikey
			}
			
		}

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const result = await res.json();

		if(result.error) {
			this.setState({error: true})
			return;
		}

		localStorage.setItem("ef_secret", this.state.secret);
		
		window.location.reload()

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
								<input type="text" name="apikey" value={this.state.apikey} onChange={this.handleChange} />
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