import {Link} from 'react-router';
import React, {Component} from 'react';

import './index.scss';

class ListCarousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0
		}
	}

	componentDidMount() {
		let length = this.props.links && this.props.links.length || 0;
		
		if(length === 0) {
			return;
		}

		this._handle = setInterval( () => 
			 this.setState({
				index: (this.state.index + 1) % length
			})
		, 5000)
	}
	
	componentWillReceiveProps(nextProps) {
		clearInterval(this._handle);

		let length = nextProps.links && nextProps.links.length || 0;

		if(length === 0) {
			return;
		}
		
		this._handle = setInterval( () => 
			this.setState({
				index: (this.state.index + 1) % length
			})
		, 5000)
	}

	componentWillUnmount() {
		clearInterval(this._handle);
	}

	render() {
		const {title = "最新文章", links} = this.props;
		return (
			<div className="list-head-carousel-wrap">
				<div className="list-head-carousel-title">
					{title}: 
				</div>
				
				<div className="list-head-carousel">
					{
						links.map((link, index) => (
							<p style={index === this.state.index ? {opacity: 1} : null } key={index}>
								<Link to={link.link}>{link.value}</Link>
							</p>
						))
					}
				</div>
			</div>
		)
	}
}

export default ListCarousel;