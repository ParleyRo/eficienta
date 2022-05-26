import {Component} from 'react';
import ItemLoading from '../ItemLoading';

class Email extends Component {

	constructor(props) {
		
		super(props);
		
		this.sendEmail = this.sendEmail.bind(this);
	}

	sendEmail(){

		console.log(this.props)
		console.log('clicked')

	}

	render(){

		const colStyle = {
			textAlign: 'right',
		} 

		return (
			<div className="email">

				<div className="row is-flex">
					<div className="col">
						<h2 className="title">Email</h2>
					</div>
					<div className="col" style={colStyle}>
						<button href="#" onClick={this.sendEmail}>Send email</button>
					</div>
				</div>

				<div className="row is-flex">
					<div className="col">
						<h3 className="title">Subject</h3>
					</div>
				</div>
				
				<div className="row is-flex">
					<div className="col">
						<p className="subject">monthly efficiency for {this.props.data.user?.savedData?.value?.name || '' } - {this.props.data.user.month}</p>
					</div>
				</div>

				<div className="row is-flex">
					<div className="col">
						<hr />
					</div>
				</div>

				<div className="row is-flex">
					<div className="col">
						<h3 className="title">Body</h3>
					</div>
				</div>

				<div className="row is-flex">
					<div className="col">
						<div className="body">
							<p>Hi</p>

							<p>{this.props.data.user.month} month efficiency total = {this.props.data.efficiency ? <span>{this.props.data.efficiency}%</span> : <ItemLoading /> } of {this.props.data.time.workHours} hours</p>

							<p>
								{this.props.data.time.everhour ? <span>{this.props.data.time.everhour}h</span> : <ItemLoading />}(EverHour)&nbsp;+&nbsp; 
								{this.props.data.time.freedays}h(Free days)&nbsp;+&nbsp;
								{this.props.data.time.daysoff}h{this.props.data.daysoffView}(Days off)&nbsp;=&nbsp;
								{this.props.data.time.everhour ? <span >{this.props.data.time.everhour+this.props.data.time.freedays+this.props.data.time.daysoff}h({this.props.data.efficiency}%)</span> : <ItemLoading /> }
							</p>

							<p>bye</p>
						</div>
					</div>
				</div>

			</div>
		)
	}
  
}

export default Email