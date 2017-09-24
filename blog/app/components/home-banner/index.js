import React from 'react';
import {Col, Row} from 'antd';

import Banner from '../banner';

import './index.scss';

const HomeBanner = () => {
	let titleStyle = {
		top: '14%',
		right: '19%',
		fontSize: "23px"
	};
	let bodyStyle = {
		right: "10%",
		top: "32%",
		width: "75%",
		fontSize: "18px"
	};
	
	return (
		<div className="container home-banner">
			<Row gutter={12}>
				<Col sm={24} md={15}>
					<Banner />
				</Col>
				<Col xs={0} sm={0} md={9}>
					<div className="day-word">
						<img src="/image/bord.jpg" alt=""/>
						<p style={titleStyle}>每日一语</p>
						<p style={bodyStyle}>毕竟不是作家，写不出那么好的文章 — 因为没有丰富阅历和经验！闲下来时多看看书，书本里的故事总有我要学的人生。</p>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default HomeBanner;