import {Component} from 'react';

class Menu extends Component {

	render(){
		return (
			<div className="is-flex va-center menu">
				<div className="col">
					<h2 data-target="efficiency" onClick={this.props.makeActive} className={(this.props.menu.efficiency?'active':'')+' title text-center'}>⌚<br />Efficiency</h2>
				</div>
				<div className="col">
					<h2 data-target="email" onClick={this.props.makeActive} className={(this.props.menu.email?'active':'')+' title text-center'}>📧<br />Email</h2>
				</div>
				<div className="col">
					<h2 data-target="invoice" onClick={this.props.makeActive} className={(this.props.menu.invoice?'active':'')+' title text-center'}>📝<br />Invoice</h2>
				</div>
			</div>
		)
	}

}

export default Menu;