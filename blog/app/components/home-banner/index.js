import React from 'react';

import {Col, Row} from 'antd';

import Banner from '../banner';

import './index.scss';
import boardImg from '../../../public/image/bord.jpg';

const HomeBanner = () => {
    return (
        <div className="container home-banner">
            <Row gutter={8}>
                <Col sm={24} md={15}>
                    <Banner/>
                </Col>
                <Col xs={0} sm={0} md={9}>
                    <div className="day-word">
                        <img src={boardImg} alt=""/>
                        <p>毕竟不是作家，写不出那么好的文章。-- 因为没有丰富阅历和经验！</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HomeBanner;