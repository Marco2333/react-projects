import {Link} from 'react-router';
import React, {Component} from 'react';
import {Row, Col, Input, Icon, Popover} from 'antd';

import logoImg from "../../../public/image/logo.png";

import "./index.scss";
import {showMessage} from '../common/show';

class NavTop extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			keyword: '',
			link: '',
			visible: false
		};
	}

	static contextTypes = {
		router: React.PropTypes.object
	}

	onSearch = (keyword) => {
		if(keyword.trim() == '') {
			return;
		}
		
		this.setState({ visible: false });
		keyword = keyword.substr(0, 15);
		this.context.router.push(`/search/${keyword}`);
	}

	handleChange = (event) => {
		this.setState({keyword: event.target.value});
	}

	onClick = (event) => {
		 this.setState({
			 link: event.target.getAttribute('data-key')
		 })
	}

	handleVisibleChange = (visible) => {
		this.setState({ visible: !this.state.visible });
	}

	handleMouseOver = () => {
		if(loadlive2d) {
			showMessage(document.querySelector('.live2d-message'), '在找什么东西呢，需要帮忙吗？', 3000);
		}
	}

	render() {
		const links = [
			{key: "home", text: '主页'},
			{key: "article", text: '文章'},
			{key: "timeline", text: '归档'},
			{key: "gather", text: '点滴'},
			{key: "gossip", text: '慢生活'},
			// {key: "gossip", text: '碎言碎语'}
		];
		
		let Search = Input.Search;
		let currLink = this.state.link;
		const content = (
			<Col sm={0}>
				<div onClick={this.onClick}>
					{
						links.map((item) => (
							item.key === currLink
							? 	<p className="navbar-item active" key={item.key} onClick={this.handleVisibleChange}>
									<Link to={"/" + item.key} data-key={item.key}>{item.text}</Link>
								</p>
							: 	<p className="navbar-item" key={item.key}>
									<Link to={"/" + item.key} data-key={item.key} onClick={this.handleVisibleChange}>{item.text}</Link>
								</p>
						))
					}
					<div style={{padding: "10px"}}>
						<Search
							size="large"
							placeholder="Search"
							value={this.state.keyword}
							onSearch={this.onSearch}
							onChange={this.handleChange}/>
					</div>
				</div>
			</Col>
		);

		return (
			<div className="nav-top-wrap">
				<div className="container">
					<div className="site-logo">
						<h2>
							<span>Ma</span><span>rco</span>
						</h2>
						<p>我想去天堂，但我不想死</p>
					</div>
					<div className="navbar-collapse">
						<Col xs={24} sm={0}>
							<div className="navbar-collapse-button">
								<Icon type={this.state.visible ? 'menu-unfold' : 'menu-fold'} onClick={this.handleVisibleChange} />
							</div>
							<div className="navbar-collapse-body" style={{height: this.state.visible ? 280 : 0}}>
								{content}
							</div>
						</Col>
					</div>
				</div>
				<Row>
					<Col xs={0} sm={24}>
						<div className="nav-top">
							<div className="container">
								<ul onClick={this.onClick}>
									{
										links.map((item) => (
											<li className="nav-top-item" key={item.key}>
												<Link to={`/${item.key}`} data-key={item.key}>{item.text}</Link>
											</li>
										))
									}
									<div className="nav-top-search" onMouseOver={this.handleMouseOver}>
										<Search
											size="large"
											placeholder="Search"
											value={this.state.keyword}
											onSearch={this.onSearch}
											onChange={this.handleChange} />
									</div>
								</ul>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

export default NavTop;