export default function Nav(props) {

	return (
		
		
		<div className="row is-flex va-center">
			<div className="col text-center">
				<a className="icon-container" href={'?month='+(props.data.currentMonth-1)}><b><span className="icon">&lt;</span>&nbsp;{props.data.user.prevmonth}</b></a>
			</div>

			<div className="col text-center">
				<h1 className="title blue">{props.data.user.month}</h1>
				
			</div>
			<div className="col text-center">
				{props.data.user.nextmonth && <a className="icon-container" href={props.data.currentMonth === -1 ? '/' : '?month='+(props.data.currentMonth+1)}><b>{props.data.user.nextmonth}&nbsp;<span className="icon">&gt;</span></b></a>}
			</div>
		</div>
	
	)
}