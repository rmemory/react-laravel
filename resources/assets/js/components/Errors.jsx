import React from 'react';
import PropTypes from 'prop-types';

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

Errors.propTypes ={
	errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
};

export default Errors;