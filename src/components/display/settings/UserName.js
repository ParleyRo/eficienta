import {Component} from 'react';

class UserName extends Component {
	
	constructor(props) {

		super(props);
		
		this.state = {
			name: props.data.user.name || null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {

		this.setState({name: event.target.value});
	}

	async handleSubmit(event) {

		event.preventDefault();
		
		const url = `${window.location.protocol}//${window.location.hostname}:3001/save`;
		
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({secret: this.props.data.user.secret,name: this.state.name.trim()})
		});

		const result = await res.json();
		
		if(result.success){

			this.props.changedData({name: this.state.name})
		}
	}

	render(){

		return (
			<>
				
				<form onSubmit={this.handleSubmit}>
				
					<div className="row is-flex va-end">

							<div className="col auto ">
								<label>
									<div>Set your name: </div>
									<input className="large" type="text" value={this.state.name || ''} onChange={this.handleChange} required />
								</label>
							</div>

							<div className="col auto">

								<input type="submit" value="Submit" />
							
							</div>
						</div>


				</form>
				
			</>

		)
	}
}

 export default UserName;