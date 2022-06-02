import {Component} from 'react';

import Settings from './display/Settings.js';

import Nav from './display/Nav.js';
import Efficiency from './display/Efficiency.js';
import Email from './display/Email.js';
import Invoice from './display/Invoice.js';

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
					<div className="col">
						
						<div className="text-right" >
							<div className="has-pointer toggleSettings text-center" onClick={this.toggleSettings}>
								<span className="is-big" title="settings">{this.state.settings.isActive ? '🔙' : '⚙️' }</span>
								<br />
								<small>Settings</small>
							</div>
						</div>
					
					</div>
				</div>

				{this.state.settings.isActive && <Settings data={this.props.data} changedData={this.props.changedData} />}

				{!this.state.settings.isActive &&
				
					<>
						<Nav data={this.props.data}/>

						<Efficiency data={this.props.data}/>

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