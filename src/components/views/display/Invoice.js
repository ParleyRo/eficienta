import ItemLoading from '../ItemLoading';

export default function Invoice(props) {
  return (
    <div class="invoice">
		<div className="row is flex">
			<div className="col">
				<h2 className="title">Invoice <ItemLoading /></h2>
			</div>
		</div>
		
	</div>
  )
}