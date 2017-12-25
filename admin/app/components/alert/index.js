import React, {Component} from 'react';

import './index.scss';

class Alert extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: ''
		}
	}

	handleClick = () => {
		setTimeout(() => {
			this.setState({
				show: 'none'
			});
		}, 450);
		this.setState({
			opacity: 0
		});
	}

	render() {
		const {status = 'info', info = ''} = this.props;
		const {show, opacity = 1} = this.state;

		return (
			<div className={`alert ${status} ${show}`} style={{opacity: opacity}}>
				{info}
				<span className="close" onClick={this.handleClick}>
					×
				</span>
			</div>
		)
	}
}

export default Alert;