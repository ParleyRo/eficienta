import ItemLoading from '../ItemLoading.js';

export default function Efficiency(props) {

	const setEverhour = function(event){
		
		props.changedData({
			everhour: event.target.value
		});	
	}

	return (
		<div className="efficiency">

			<div className="row is-flex">
				<div className="col">
					<h3 className="title">{props.data.user.name || ''} - {props.data.monthInfo.name} {props.data.monthInfo.day}</h3>
				</div>
			</div>

			<div className="row is-flex">
				
				<div className="col">
					<p>MonthDays: {props.data.monthInfo.monthDays}</p>
					<p>WeekendDays: {props.data.monthInfo.weekendDays}</p>
					<p>WorkDays: {props.data.monthInfo.workDays}</p>

					<hr className="half-width" />
					
					<p className="green"><b>WorkedDays: {props.data.monthInfo.workedDays}</b></p>
				</div>

				<div className="col">
					<p>WorkHours: {props.data.time.workHours}h</p>

					<p className="is-flex va-center orange">Everhour:&nbsp;{props.data.time.everhour != null
							? <span >{props.data.time.everhour > 0 
									? props.data.time.everhour + 'h'
									: <label><input onBlur={setEverhour} className="custom"/></label> 
								}
								</span>
							: <ItemLoading data={{color: 'orange'}}/>
						}
					</p>

					<p className="orange">Free days: {props.data.time.freedays}h</p>
					
					<p className="orange">Days off: {props.data.time.daysoff}h</p>

					{ props.data.time.missingHours > 0  && 
						<p className="red">Missing Hours: &nbsp;{props.data.time.missingHours != null
								? <span>{props.data.time.missingHours}h</span>
								: <ItemLoading data={{color: 'orange'}}/>
							}
						</p>
					}

					{ props.data.time.missingHours < 0  && 
						<p className="orange">Over Hours: &nbsp;{props.data.time.missingHours != null
								? <span>{props.data.time.missingHours * (-1)}h</span>
								: <ItemLoading data={{color: 'orange'}}/>
							}
						</p>
					}

					<p className="orange"><b>Total: {props.data.time.everhour + props.data.time.freedays + props.data.time.daysoff}h</b></p>

					<hr className="half-width" />

					<p className="green">WorkedHours: {props.data.time.workedHours}h</p>

				</div>

				<div className="col">
					<p className="is-flex va-center">Efficiency:&nbsp;{props.data.efficiency.total
							? <span>{props.data.efficiency.total}%</span>
							: <ItemLoading />
						}
					</p>

					<hr className="half-width" />
					
					<p className="green is-flex va-center"><b>Efficiency till today:&nbsp;{props.data.efficiency.current
							? <span>{props.data.efficiency.current}%</span>
							: <ItemLoading data={{color: 'green'}}/>
						}
					</b></p>
				</div>

			</div>
		</div>
	)
}