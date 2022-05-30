import {Component} from 'react';

import UserName from './settings/UserName';
import Daysoff from './settings/Daysoff';
class Settings extends Component {

	constructor(props) {

		super(props);

		this.state={}
	
	}


	render(){

		return (
		
			<div className="settings container">

				<div className="is-flex va-center">
					<div className="col auto"> <UserName data={this.props.data}/> </div>
					<div className="col auto"> <Daysoff data={this.props.data}/> </div>
					<div className="col text-right">
						<button onClick={this.logout}>Logout</button>
					</div>
				</div>

			</div>
		)
	
	}
}


export default Settings;