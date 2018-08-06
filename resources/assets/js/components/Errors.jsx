import React, { Fragment } from 'react';

const Errors = ({errors}) => (
	<div>
		<br />
		<div className="alert alert-danger">
			<ul>
				{Object.keys(errors).map(errorKey =>
					<li key={errorKey}>
						{errors[errorKey]}
					</li> 
				)}
			</ul>
		</div>
	</div>
);

export default Errors;