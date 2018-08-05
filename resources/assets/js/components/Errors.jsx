import React, { Fragment } from 'react';

const Errors = ({errors}) => (
	<div>
		<br />
		<div class="alert alert-danger">
			<ul>
				{
					Object.values(errors).map(error => {
						<li>
							{{ error }}
						</li>
					})
				}
			</ul>
		</div>
	</div>
);


export default Errors;