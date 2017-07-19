import React, {Component} from 'react';

import {Row, Col} from 'antd';

import NavTop from '../components/nav-top-home';
import Banner from '../components/banner';
import ArticalList, {reducer as articalReducer, stateKey as articalStateKey} from '../components/artical-list';
import ListCarousel from '../components/list-carousel';
import NavSide, {reducer as navSideReducer, stateKey as navSideStateKey} from "../components/nav-side";
import Footer from '../components/footer';

class Home extends Component {
    render() {
        return (
            <div>
                <NavTop/>
                <Banner/>
                <div className="container">
                    <Row gutter={32}>
                        <Col xs={24} sm={18}>
                            <ArticalList current={1} count={10} type={1} carousel={true}/>
                        </Col>
                        <Col xs={24} sm={6}>
                            <NavSide />
                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }
}

const initialState = {
    [articalStateKey]: [],
    [navSideStateKey]: {}
};

const reducer = {
    [articalStateKey]: articalReducer,
    [navSideStateKey]: navSideReducer
}

export {reducer, initialState, Home};