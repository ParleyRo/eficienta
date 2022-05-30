import {Component} from 'react';

import Settings from './display/Settings';

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

		this.toggleSettings = this.toggleSettings.bind(this);
	}

	toggleSettings(){

		this.setState({settings:{isActive: !this.state.settings.isActive}})
	}

	render(){

		return(

			<div className="main">
				
				<div className="is-flex va-end">
					<div className="col text-right">
						<h2><span className="has-pointer" onClick={this.toggleSettings}>⚙️</span></h2>
					</div>
				</div>

				{this.state.settings.isActive && <Settings data={this.props.data} />}

				{!this.state.settings.isActive &&
				
					<>
						<Nav data={this.props.data}/>

						<Stats data={this.props.data}/>

						<hr />
						
						<Email data={this.props.data} />

						<hr />

						<Invoice data={this.props.data} />
					</>
				}
				
			</div>
		)
	}
	
}

export default Display;