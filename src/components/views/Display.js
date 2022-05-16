import React from 'react';

import Stats from './display/Stats';
import Email from './display/Email';
import Invoice from './display/Invoice';

const Display = (props) => {

	return(
		<div className="main">
			
			<Stats data={props.data}/>

			<hr />
			
			<Email data={props.data} />

			<hr />

			<Invoice data={props.data} />
		</div>
    );
}

export default Display;