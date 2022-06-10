import {Component} from 'react';

import Settings from './display/Settings.js';

import Nav from './display/Nav.js';
import Menu from './display/Menu.js';
import Efficiency from './display/Efficiency.js';
import Email from './display/Email.js';
import Invoice from './display/Invoice.js';
import Invoices from './display/Invoices.js';

class Display extends Component {

	constructor(props){
	
		super(props)

		this.state = {
			settings: {
				isActive: false
			},
			menu: {
				efficiency: true,
				email: false,
				invoice: false
			}
		}

		if(!Object.entries(this.props.data.user.invoices).length){
			this.state.menu['invoices'] = false;
		}

		this.toggleSettings = this.toggleSettings.bind(this);
		this.makeActive = this.makeActive.bind(this);
	}

	toggleSettings(){

		this.setState({settings:{isActive: !this.state.settings.isActive}})
	}

	makeActive(event){

		let menu = {
			efficiency: false,
			email: false,
			invoice: false,
			invoices: false
		}

		if(this.state.menu[event.target.dataset.target] == null){
			return;
		}

		if(this.state.menu[event.target.dataset.target] === true){
			return;
		}

		menu[event.target.dataset.target] = true;

		this.setState({menu: menu});

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
						
						<hr />

						<Menu makeActive={this.makeActive} menu={this.state.menu} />

						<hr />

						<br />
						
						{this.state.menu.efficiency && 
							<Efficiency data={this.props.data} changedData={this.props.changedData}/>
						}

						{this.state.menu.email && 
							<Email data={this.props.data} />
						}

						{this.state.menu.invoice && 
							<Invoice data={this.props.data} />
						}

						{this.state.menu.invoices && 
							<Invoices data={this.props.data} />
						}

					</>
				}
				
			</div>
		)
	}
	
}

export default Display;