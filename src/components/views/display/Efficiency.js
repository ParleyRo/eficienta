import ItemLoading from '../ItemLoading.js';

export default function Efficiency(props) {

	return (
		<div className="efficiency">
					
			<div className="row is-flex">
				<div className="col">
					<h2 className="title">Efficiency</h2>
				</div>
			</div>

			<div className="row is-flex">
				<div className="col">
					<h3 className="title">{props.data.user?.data?.name} - {props.data.user.month} {props.data.user.day}</h3>
				</div>
			</div>

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
					<p className="orange is-flex va-center">Everhour:&nbsp;{props.data.time.everhour != null
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
	)
}