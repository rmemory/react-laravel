import React, { Component } from 'react';
import axios from 'axios';

import Errors from './Errors.jsx';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			body: '',
			posts: [],
			errMsgs: [],
			hasError: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this); 
		this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true });
		// Log the error
		console.error(error, info);
	  }
	

	// Called when the user presses the submit button
	handleSubmit (event) {
		event.preventDefault();
		this.postData();
	}

	// Called as the user types, but does not submit
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
				console.log(`Successful submission of post: $result{}`);
				this.setState({
					hasError: false,
					errMsg: [],
					body: '', // clear the body
				});
			} else {
				const errMsgs = this.parseErrors(result.data);
				this.setState({ // eslint-disable-line react/no-did-mount-set-state
					hasError: true,
					errMsgs: errMsgs,
				});
			}
		} catch (e) {
			const errMsgs = this.parseErrors(e['response']['data']);
			this.setState({ // eslint-disable-line react/no-did-mount-set-state
				hasError: true,
				errMsgs: errMsgs,
				body: '',
			});
		}
	}

	parseErrors(errors) {
		let returnList = [];
		for (const errorObj of Object.values(errors)) {
			for (const error of Object.values(errorObj)) {
				returnList = [...returnList, error];
			}
		}
		return returnList;
	}

	render() {
		const { hasError, errMsgs, body } = this.state;
		let message;

		if (hasError && errMsgs == '') {
			// You can render any custom fallback UI
			return <h1>Whelp, this is awkward. Something went wrong</h1>;
		}

		let messages = 'Loading posts ...';

		if (hasError) {
			messages = errMsgs;
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
										// If there are error msssages
										messages.length > 0 &&
											<Errors messages={messages} />
										}
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