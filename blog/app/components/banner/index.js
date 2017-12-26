import {Row, Col} from 'antd';
import React, {Component} from 'react';

import "./index.scss";

import bannerImg1 from "../../../public/image/s-banner1.jpg";
import bannerImg2 from "../../../public/image/s-banner2.jpg";
import bannerImg3 from "../../../public/image/s-banner3.jpg";
import bannerImg4 from "../../../public/image/s-banner4.jpg";

class Banner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0
		}
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount () {
		let length = 4;
		this.handle = setInterval(() => {
			this.setState({index: (this.state.index + 1) % length})
		}, 5000);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return this.state.index !== nextState.index;
	}
	
	componentWillUnmount() {
		clearInterval(this.handle);
	}

	handleClick(event) {
		clearInterval(this.handle);
		this.setState({index: +event.target.getAttribute('data-key')})

		let length = 4;
		this.handle = setInterval(() => {
			this.setState({index: (this.state.index + 1) % length})
		}, 5000);
	}

	render() {
		let imgList = [bannerImg1, bannerImg2, bannerImg3, bannerImg4];

		return (
			<div className="banner-wrap">
				<Row gutter={5}>
					<Col xs={19} sm={19}>
						<div className="banner-list clearfix">
							{
								imgList.map((img, index) => {
									let opacity = this.state.index == index ? 1 : 0;
									return (
										<div className="banner-item" key={index} style={{opacity: opacity}}>
											<img src={img} alt=""/>
										</div>
									)
								})
							}
						</div>
					</Col>
					<Col xs={5} sm={5}>
						<div className="banner-preview" onClick={this.handleClick}>
							{
								imgList.map((img, index) => {
									return (
										<div className="banner-preview-item" key={index}>
											<img src={img} data-key={index} alt=""/>
										</div>
									)
								})
							}
							<div className="banner-preview-arrow" style={{"top": `${this.state.index * 25}%`}}>
								<div className="banner-preview-arraw-inner"></div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Banner;