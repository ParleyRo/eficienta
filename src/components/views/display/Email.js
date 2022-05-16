import ItemLoading from '../ItemLoading';

export default function Email(props) {
  return (
    <div className="email">
		<div className="row is-flex">
			<div className="col">
				<h2 className="title">Email</h2>
			</div>
		</div>
		<div className="row is-flex">
			<div className="col">
				<h3 className="title">Subject</h3>
			</div>
		</div>
		<div className="row is-flex">
			<div className="col">
				<p className="subject">monthly efficiency for {props.data.user.name} - {props.data.user.month}</p>
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
		</div>

	</div>
  )
}