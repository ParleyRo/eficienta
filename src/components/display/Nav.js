export default function Nav(props) {

	return (
		
		
		<div className="row is-flex va-center">
			<div className="col text-center">
				<a className="icon-container" href={'?month='+(props.data.monthInfo.position-1)}><b><span className="icon is-reverse-h">➪</span>&nbsp;{props.data.monthInfo.prevmonth}</b></a>
			</div>

			<div className="col text-center">
				<h1 className="title blue">{props.data.monthInfo.name}</h1>
				
			</div>
			<div className="col text-center">
				{props.data.monthInfo.nextmonth && <a className="icon-container" href={props.data.monthInfo.position === -1 ? '/' : '?month='+(props.data.monthInfo.position+1)}><b>{props.data.monthInfo.nextmonth}&nbsp;<span className="icon">➪</span></b></a>}
			</div>
		</div>
	
	)
}