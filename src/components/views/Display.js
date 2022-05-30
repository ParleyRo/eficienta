import {Component} from 'react';

import Settings from './display/Settings';

import Nav from './display/Nav';
import Efficiency from './display/Efficiency';
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
					<div className="col">
						
						<div className="text-right" onClick={this.toggleSettings}>
							<div className="has-pointer toggleSettings text-center">
								<span className="is-big" title="settings" >⚙️</span>
								<br />
								<small>Settings</small>
							</div>
						</div>
					
					</div>
				</div>

				{this.state.settings.isActive && <Settings data={this.props.data} />}

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