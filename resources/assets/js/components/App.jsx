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
	

	/* Called when the user presses the submit button. We wait for the response
	 * asynchronously. */
	async handleSubmit (event) {
		try {
			// const target = event.target;
			event.preventDefault();
			const result = await axios
				.post('/posts', {
					body: this.state.body,
				});
			
			// We have received a result ...
			// The first conditional handles a successful post
			if (result.data &&
				result.data.success === true && // likely only includes http_code = 200
				result.status === 200) /* not part of the response payload */ {

				// target.reset();
				this.setState({
					hasError: false,
					errors: {},
					body: '', // clear the body
					posts: [...this.state.posts, result.data],
				});
				
			} else {
				const errorObject = {};
				/*
				 * This case is here for the situation where the app running on the 
				 * server returns a response which for whatever reason failed, but 
				 * isn't interpreted by the client as a "server error" (which are handled
				 * by the catch statement below). In these situations, we only support 
				 * a single error message, which must be assigned to the "error" field
				 * in the response.
				 */
				if (result.data.error !== undefined && result.data.error !== '') {
					errorObject.aUniqueKey = result.data.error;
				}
				this.setState({ // eslint-disable-line react/no-did-mount-set-state
					hasError: true,
					errors: errorObject,
				});
			}
		// This catches the rest of the server errors
		} catch (e) {
			let errors = {};
			if (e['response']['data']['errors'] !== undefined) {
				errors = e['response']['data']['errors'];
			}
			this.setState({ // eslint-disable-line react/no-did-mount-set-state
				hasError: true,
				errors,
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

	// The render method
	render() {
		const { hasError, errors, body } = this.state;

		if (hasError && (errors === undefined ||
						 (Object.keys(errors).length === 0 &&
						  errors.constructor === Object))) {
			// Catch all case
			return <h1>Whelp, this is awkward. Something went wrong</h1>;
		}

		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card">
							<div className="card-header">Post something...</div>
							<div className="card-body">
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<textarea 
											className="form-control"
											value={this.state.body}
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
											<Errors errors={errors} />
									}
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="card">
							<div className="card-header">Recent posts</div>
							<div className="card-body">
								{
									this.state.posts.map(post => 
										<div key={post['payload']['id']} className="media">
											<div className="media-object">
												<img className="media-object mr-2" src={post['payload']['user']['avatar']} />
											</div>
											<div className="media-body">
												<div className="user">
													<a href="#">
														<strong>{post['payload']['user']['username']}</strong>
													</a>
												</div>
											<p>{post['payload']['body']}</p>
											</div>
										</div>
									)
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;