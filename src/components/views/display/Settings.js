import {Component} from 'react';

import UserName from './settings/UserName';
import Daysoff from './settings/Daysoff';
import Invoice from './settings/Invoice';
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

				<div className="is-flex va-center">
					<div className="col auto"> <UserName data={this.props.data}/> </div>
					<div className="col auto"> <Daysoff data={this.props.data}/> </div>
					<div className="col text-right">
						<button onClick={this.logout}>Logout</button>
					</div>
				</div>


				<Invoice 
					data={this.props.data}
				/>

			</div>
		)
	
	}
}


export default Settings;