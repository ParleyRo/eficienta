import {Component} from 'react';

import Settings from './display/Settings';
import UserName from './display/UserName';
import Daysoff from './display/Daysoff';
import Nav from './display/Nav';
import Stats from './display/Stats';
import Email from './display/Email';
import Invoice from './display/Invoice';

class Display extends Component {

	constructor(props){
	
		super(props)

		this.state = {
			settings: {
				isActive: false
			}
		}

		this.logout = this.logout.bind(this);
	}

	logout(){
	
		localStorage.removeItem('ef_secret');

		window.location.reload()
	}

	render(){
		return(

			<div className="main">
				
				<div className="is-flex va-end">
					<div className="col text-right">
						<h2><span id="settings" className={this.state.settings.isActive ? 'active' : ''}>⚙️</span></h2>
					</div>
				</div>

				<Settings data={this.props.data} display={this.state.settings}/>


				<div className="is-flex va-center">
					<div className="col auto"> <UserName data={this.props.data}/> </div>
					<div className="col auto"> <Daysoff data={this.props.data}/> </div>
					<div className="col text-right">
						<button onClick={this.logout}>Logout</button>
					</div>
				</div>

				<hr />

				<Nav data={this.props.data}/>

				<Stats data={this.props.data}/>

				<hr />
				
				<Email data={this.props.data} />

				<hr />

				<Invoice data={this.props.data} />
		
			</div>
		)
	}
	
}

export default Display;