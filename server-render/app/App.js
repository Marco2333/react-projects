import React, {Component} from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: props.initialCount || 2
		}
	}

	handleClick = () => {
		this.setState({count: this.state.count + 1})
	}

	render() {
		return (
			<div>
				<span>1 the count is: </span>
				<button onClick={this.handleClick}>{this.state.count}</button>
			</div>
		)
	}
}

export default App;