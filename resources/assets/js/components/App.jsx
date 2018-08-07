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
			loading: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this); 
		this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
		this.handleResponseError = this.handleResponseError.bind(this);
		this.handleResponseException = this.handleResponseException.bind(this);
		this.renderPosts = this.renderPosts.bind(this);
	}

	async componentDidMount() {
		// this.getPosts();
		this.setState({loading: true});
		try {
			const response = await axios.get('/posts');
			// We have received a result ...
			// The first conditional handles a successful post
			if (response.data &&
				response.data.success === true && // likely only includes http_code = 200
				response.status === 200) /* not part of the response payload */ {
	
				this.setState({
					posts: [...response.data.payload]
				});
			} else {
				this.handleResponseError();
			}
		} catch (e) {
			this.handleResponseException(e);
		}

		this.setState({loading: false});
	}

	handleResponseError(response) {
		const errorObject = {};
		/*
		 * This case is here for the situation where the app running on the 
		 * server returns a response which for whatever reason failed, but 
		 * isn't interpreted by the client as a "server error" (which are handled
		 * by the catch statement below). In these situations, we only support 
		 * a single error message, which must be assigned to the "error" field
		 * in the response.
		 */
		if (response.data !== undefined && response.data.error !== undefined && response.data.error !== '') {
			errorObject.aUniqueKey = [response.data.error];
		}
		this.setState({ // eslint-disable-line react/no-did-mount-set-state
			hasError: true,
			errors: errorObject,
		});
	}

	handleResponseException(exception) {
		let errors = {};
		if (exception['response'] === undefined) {
			console.error(exception.message);
		} else if (exception['response']['data']['errors'] !== undefined) {
			errors = exception['response']['data']['errors'];
		} else {
			console.error("Unknown exception:");
			console.error(exception);
		}
		this.setState({ // eslint-disable-line react/no-did-mount-set-state
			hasError: true,
			errors,
		});
	}

	/* Called when the user presses the submit button. We wait for the response
	 * asynchronously. */
	async handleSubmit(event) {
		try {
			// const target = event.target;
			event.preventDefault();
			const response = await axios
				.post('/posts', {
					body: this.state.body,
				});
			
			// We have received a result ...
			// The first conditional handles a successful post
			if (response.data &&
				response.data.success === true && // likely only includes http_code = 200
				response.status === 200) /* not part of the response payload */ {

				// target.reset();
				this.setState({
					hasError: false,
					errors: {},
					body: '', // clear the body
					posts: [...this.state.posts, ...response.data.payload],
				});
				
			} else {
				this.handleResponseError(response);
			}
		// This catches the rest of the server errors
		} catch (e) {
			this.handleResponseException(e);
		}
	}

	// Called as the user types a post, but does not submit
	handleTextAreaChange(event) {
		event.preventDefault();
		this.setState({ 
			body: event.target.value,
		});
	}

	renderPosts() {
		return this.state.posts.map(post => 
			<div key={post['id']} className="media">
				<div className="media-object">
					<img className="media-object mr-2" src={post['user']['avatar']} />
				</div>
				<div className="media-body">
					<div className="user">
						<a href={`/users/${post['user']['username']}`}>
							<strong>{post['user']['username']}</strong>
						</a>
					</div>
				<p>{post['body']} - <strong>{post['humanCreatedAt']}</strong></p>
				</div>
			</div>
		);
	}

	// The render method
	render() {
		const { body } = this.state;
		let { hasError, errors } = this.state;
		const { hasError:propsHasError, errors:propsErrors } = this.props;

		if (propsHasError) {
			hasError = propsHasError;
			errors = {...errors, ...propsErrors};
		}

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
							<div className="card-header bg-info font-weight-bold">Post something...</div>
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
									<input className="form-control btn-primary" type="submit" value="Create Post" />
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
							<div className="card-header bg-info font-weight-bold">Recent posts</div>
							<div className="card-body">
								{this.state.loading?'Loading ..':this.renderPosts()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;