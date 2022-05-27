import React from 'react';

import UserName from './display/UserName';
import Daysoff from './display/Daysoff';
import Nav from './display/Nav';
import Stats from './display/Stats';
import Email from './display/Email';
import Invoice from './display/Invoice';

const Display = (props) => {

	return(
		<div className="main">
			
			<div className="is-flex va-center">
				<div className="col auto"> <UserName data={props.data}/> </div>
				<div className="col auto"> <Daysoff data={props.data}/> </div>
			</div>
			
			<Nav data={props.data}/>

			<Stats data={props.data}/>

			<hr />
			
			<Email data={props.data} />

			<hr />

			<Invoice data={props.data} />
      
		</div>
    );
}

export default Display;