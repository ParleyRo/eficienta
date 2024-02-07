import {Component} from 'react';

class Menu extends Component {

	render(){
		return (
			<div className="is-flex va-center menu">
				<div className="col">
					<h3 className={(this.props.menu.efficiency?'active':'')+' title text-center'}><span data-target="efficiency" onClick={this.props.makeActive} >⌚<br />Efficiency</span></h3>
				</div>
				<div className="col">
					<h3 className={(this.props.menu.email?'active':'')+' title text-center'}><span data-target="email" onClick={this.props.makeActive}>📧<br />Email</span></h3>
				</div>
				{/* <div className="col">
					<h3 className={(this.props.menu.invoice?'active':'')+' title text-center'}><span data-target="invoice" onClick={this.props.makeActive}>📝<br />Invoice</span></h3>
				</div>

				{this.props.menu.invoices != null &&
					<div className="col">
						<h3 className={(this.props.menu.invoices?'active':'')+' title text-center'}><span data-target="invoices" onClick={this.props.makeActive}>📂<br />Invoices</span></h3>
					</div>
				} */}
			</div>
		)
	}

}

export default Menu;