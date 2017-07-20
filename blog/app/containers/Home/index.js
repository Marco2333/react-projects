import React, {Component} from 'react';

import {Row, Col} from 'antd';

import NavTop from '../../components/nav-top-home';
import Banner from '../../components/banner';
import NavSide, {initialState as navSideIS, reducer as navSideReducer, stateKey as navSideSK} from "../../components/nav-side";
import Footer from '../../components/footer';

import ArticalList, {initialState as articalsIS, reducer as articalsReducer, stateKey as articalsSK} from './Articals';

class Home extends Component {
    render() {
        return (
            <div>
                <NavTop/>
                <Banner/>
                <div className="container">
                    <Row gutter={32}>
                        <Col xs={24} sm={18}>
                            <ArticalList current={1} count={15} type={1} carousel={true}/>
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
    [articalsSK]: articalsIS,
    [navSideSK]: navSideIS
};

const reducer = {
    [articalsSK]: articalsReducer,
    [navSideSK]: navSideReducer
}

export {reducer, initialState, Home};