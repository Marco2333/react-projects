import React, {Component} from 'react';

import {Row, Col} from 'antd';

import NavTop from '../components/nav-top-home';
import Banner from '../components/banner';
import ArticalList, {stateKey, reducer} from '../components/artical-list';
import ListCarousel from '../components/list-carousel';
import Footer from '../components/footer';

class Home extends Component {
    render() {
        return (
            <div>
                <NavTop/>
                <Banner/>
                <div className="container">
                    <Row>
                        <Col xs={24} sm={18}>
                            <ArticalList current={1} count={10} type={1} carousel={true}/>
                        </Col>
                        <Col xs={24} sm={6}></Col>
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }
}

const initialState = {};

export {reducer, stateKey, initialState, Home};