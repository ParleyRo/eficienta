import {Component} from 'react';

import UserName from './settings/UserName.js';
import Daysoff from './settings/Daysoff.js';
import Invoice from './settings/Invoice.js';
class Settings extends Component {

	constructor(props) {

		super(props);

		this.state={}

		this.logout = this.logout.bind(this);
	}

	logout(){
	
		localStorage.removeItem('ef_secret');

		window.location.reload()
	}

	render(){

		return (
		
			<div className="settings container has-boxshadow">
				
				<div className="logout has-pointer text-center" onClick={this.logout}>
					<span className="is-big" title="logout" >🏃‍♂️</span>
					<br />
					<small>Logout</small>
				</div>

				<div className="is-flex va-center responsive">
					<div className="col auto">
						<UserName data={this.props.data} changedData={this.props.changedData}/>
					</div>
					<div className="col auto">
						<Daysoff data={this.props.data} changedData={this.props.changedData}/>
					</div>
					
				</div>

				<hr />

				<Invoice 
					data={this.props.data}
					changedData={this.props.changedData}
				/>

			</div>
		)
	
	}
}


export default Settings;