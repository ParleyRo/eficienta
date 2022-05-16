import React from 'react';
import ItemLoading from './ItemLoading';

const Display = (props) => {

	return(
		<div className="main">
			
			<div className="efficiency">
				
				<div className="row is-flex">
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

				<h3 className="title">{props.data.user.name} - {props.data.user.month} {props.data.user.day}</h3>

				<div className="row is-flex">
					
					<div className="col">
						<p>MonthDays: {props.data.monthDays}</p>
						<p>WeekendDays: {props.data.weekendDays}</p>
						<p>WorkDays: {props.data.workDays}</p>
						<p className="green"><b>WorkedDays: {props.data.workedDays}</b></p>
					</div>

					<div className="col">
						<p>WorkHours: {props.data.time.workHours}h</p>
						<p className="green">WorkedHours: {props.data.time.workedHours}h</p>
						<p className="orange is-flex va-center">Everhour:&nbsp;{props.data.time.everhour 
								? <span>{props.data.time.everhour}h</span> 
								: <ItemLoading data={{color: 'orange'}}/>
							}
						</p>
						<p className="orange">Free days: {props.data.time.freedays}h</p>
						<p className="orange">Days off: {props.data.time.daysoff}h</p>
					</div>

					<div className="col">
						<p className="is-flex va-center">Efficiency:&nbsp;{props.data.efficiency
								? <span>{props.data.efficiency}%</span>
								: <ItemLoading />
							}
						</p>
						<p className="green is-flex va-center"><b>Efficiency today:&nbsp;{props.data.efficiencyToday
								? <span>{props.data.efficiencyToday}%</span>
								: <ItemLoading data={{color: 'green'}}/>
							}
						</b></p>
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

					<p>{props.data.user.month} month efficiency total = {props.data.efficiency ? <span>{props.data.efficiency}%</span> : <ItemLoading /> } of {props.data.time.workHours} hours</p>

					<p>
						{props.data.time.everhour ? <span>{props.data.time.everhour}h</span> : <ItemLoading />}(EverHour)&nbsp;+&nbsp; 
						{props.data.time.freedays}h(Free days)&nbsp;+&nbsp;
						{props.data.time.daysoff}h{props.data.daysoffView}(Days off)&nbsp;=&nbsp;
						{props.data.time.everhour ? <span >{props.data.time.everhour+props.data.time.freedays+props.data.time.daysoff}h({props.data.efficiency}%)</span> : <ItemLoading /> }
					</p>

					<p>bye</p>
				</div>

			</div>

			<hr />
		</div>
    );
}

export default Display;