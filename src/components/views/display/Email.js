import {Component} from 'react';
import ItemLoading from '../ItemLoading.js';

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

		return (
			
			<div className="email">

				<div className="row is-flex">
					<div className="col">
						<h2 className="title">Email</h2>
					</div>
					
				</div>

				<div className="scroll-x">
				
					<div className="row is-flex responsive">
						<div className="col">
							<h3 className="title">Subject</h3>
							<br />
							<p className="subject">{this.props.data.user.name ? <span>monthly efficiency for {this.props.data.user.name } - {this.props.data.monthInfo.name}</span> : <ItemLoading />}</p>
						</div>
					
						<div className="col">
							<h3 className="title">Body</h3>
							<br />
							<div className="body">
								<p>Hi</p>

								<p>{this.props.data.monthInfo.name} month efficiency total = {this.props.data.efficiency.total ? <span>{this.props.data.efficiency.total}%</span> : <ItemLoading /> } of {this.props.data.time.workHours} hours</p>

								<p>
									{this.props.data.time.everhour != null ? <span>{this.props.data.time.everhour}h</span> : <ItemLoading />}(EverHour)&nbsp;+&nbsp; 
									{this.props.data.time.freedays}h(Free days)&nbsp;+&nbsp;
									{this.props.data.time.daysoff}h{this.props.data.user.daysoff.length ? ':'+this.props.data.user.daysoff.join(',') : ''}(Days off)&nbsp;=&nbsp;
									{this.props.data.time.everhour != null? <span >{this.props.data.time.everhour+this.props.data.time.freedays+this.props.data.time.daysoff}h({this.props.data.efficiency.total}%)</span> : <ItemLoading /> }
								</p>

								<p>bye</p>
							</div>
						</div>
						
					</div>

				</div>
			</div>
		)
	}
  
}

export default Email