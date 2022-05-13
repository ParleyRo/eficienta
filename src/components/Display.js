import React from 'react';

const Display = (props) => {
	
	
    
	return(
		<div className="main">
			{props.data.isLoaded === false && <div className="overlay"></div>}
			<div className="efficiency">
				
				<div className="row has-vertical-align-center">
					<div className="col text-center">
						<a href={'?month='+(props.data.currentMonth-1)}><b><span className="icons">&lt;</span>&nbsp;{props.data.user.prevmonth}</b></a>
					</div>

					<div className="col text-center">
						<h1 className="title blue">{props.data.user.month}</h1>
					</div>
					<div className="col text-center">
						{props.data.user.nextmonth && <a href={'?month='+(props.data.currentMonth+1)}><b>{props.data.user.nextmonth}&nbsp;<span className="icons">&gt;</span></b></a>}
					</div>
				</div>

				<h2 className="title">Efficiency</h2>

				<h3 className="title">{props.data.user.name} - {props.data.user.month} on day {props.data.user.day}</h3>

				<div className="row">
					
					<div className="col">
						<p>TotalDays: {props.data.totalDays}</p>
						<p>WeekendDays: {props.data.weekendDays}</p>
						<p>WorkDays: {props.data.workDays}</p>
						<p className="green"><b>WorkedDays: {props.data.workedDays}</b></p>
					</div>

					<div className="col">
						<p>WorkHours: {props.data.time.workHours}</p>
						<p>Everhour: {props.data.time.everhour}</p>
						<p>Freedays: {props.data.time.freedays}</p>
						<p>Daysoff: {props.data.time.daysoff}</p>
					</div>

					<div className="col">
						<p>Efficiency: {props.data.efficiency}%</p>
						<p className="green"><b>Efficiency today: {props.data.efficiencyToday}%</b></p>
					</div>

				</div>
			</div>

			<hr />
			
			<div className="email">
				<h2 className="title">Email</h2>
				<h3 className="title">Subject</h3>
				<p className="subject">monthly efficiency for {props.data.user.name} - {props.data.user.month}</p>
				<br />
				<hr />
				<h3 className="title">Body</h3>

				<div className="body">
					<p>Hi</p>

					<p>{props.data.user.month} month efficiency total = {props.data.efficiency}% of {props.data.time.workHours} hours</p>

					<p>
						{props.data.time.everhour}h(EverHour)&nbsp;+&nbsp; 
						{props.data.time.freedays}h(Free days)&nbsp;+&nbsp;
						{props.data.time.daysoff}h{props.data.daysoffView}(Days off)&nbsp;=&nbsp;
						{props.data.time.everhour+props.data.time.freedays+props.data.time.daysoff}h({props.data.efficiency}%)
					</p>

					<p>bye</p>
				</div>

			</div>

			<hr />
		</div>
    );
}

export default Display;