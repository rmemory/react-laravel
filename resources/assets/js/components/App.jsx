import React, { Component } from 'react';
import axios from 'axios';

import Errors from './Errors.jsx';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			body: '',
			posts: [],
			errors: {},
			hasError: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this); 
		this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
	}

	// React's Error Boundary life cycle method
	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ 
			hasError: true,
			errors: error,
		});
		// Log the error
		console.error(error, info);
	  }
	

	// Called when the user presses the submit button
	async handleSubmit (event) {
		try {
			const target = event.target;
			event.preventDefault();
			const result = await axios
				.post('/posts', {
					body: this.state.body,
				});
			if (result.status === 200) {
				target.reset();
				this.setState({
					hasError: false,
					errMsg: {},
					body: '', // clear the body
				});
			} else {
				this.setState({ // eslint-disable-line react/no-did-mount-set-state
					hasError: true,
					errors: result.data,
				});
			}
		} catch (e) {
			this.setState({ // eslint-disable-line react/no-did-mount-set-state
				hasError: true,
				errors: e['response']['data']['errors'],
			});
		}
	}

	// Called as the user types a post, but does not submit
	handleTextAreaChange (event) {
		event.preventDefault();
		this.setState({ 
			body: event.target.value,
		});
	}

	// Post data to the backend
	async postData() {
		try {
			const result = await axios
				.post('/posts', {
					body: this.state.body,
				});
			if (result.status === 200) {
				this.setState({
					hasError: false,
					errMsg: {},
					body: '', // clear the body
				});
			} else {
				this.setState({ // eslint-disable-line react/no-did-mount-set-state
					hasError: true,
					errors: result.data,
				});
			}
		} catch (e) {
			this.setState({ // eslint-disable-line react/no-did-mount-set-state
				hasError: true,
				errors: e['response']['data']['errors'],
				body: '',
			});
		}
	}

	render() {
		const { hasError, errors, body } = this.state;

		if (hasError && errors == {}) {
			// Catch all case
			return <h1>Whelp, this is awkward. Something went wrong</h1>;
		}

		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card">
							<div className="card-header">Tweet something</div>
							<div className="card-body">
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<textarea 
											className="form-control"
											maxLength="140"
											name="text" id=""
											onChange={this.handleTextAreaChange}
											rows="5"
											placeholder="What's up?"
											required />
									</div>
									<input className="form-control" type="submit" value="Post" />
									{
										// If there are error messages
										hasError &&
											<div>
												<br />
												<div className="alert alert-danger">
													<ul>
														{Object.keys(errors).map(errorKey => 
															<Errors key={errorKey} errorMsg={errors[errorKey]} />
														)}
													</ul>
												</div>
											</div>
									}
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="card">
							<div className="card-header">App Component</div>

							<div className="card-body">
								I'm an app component!
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;