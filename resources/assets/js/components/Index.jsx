import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			errors: {},
			hasError: false,
		}
	}

	/* 
	 * React's Error Boundary life cycle method
	 * 
	 * According to the docs, "error boundaries only catch errors in the
	 * components below them in the tree. An error boundary can’t catch
	 * an error within itself."
	 * 
	 * Which is why it is implemented here.
	 */
	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ 
			hasError: true,
			errors: error,
		});
		// Log the error
		console.error(error, info);
	}
	
	render() {
		return <App hasError={this.state.hasError} errors={this.state.errors} />
	}
}

if (document.getElementById('main')) {
	ReactDOM.render(<Main />, document.getElementById('main'));
}
