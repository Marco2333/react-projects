import React from 'react';

import {Row, Col} from 'antd';

import NavSide, {reducer, initialState, stateKey} from '../components/nav-side';
import NavTop from '../components/nav-top';
import Footer from '../components/footer';

export default({children}) => (
    <div>
        <NavTop/>
        <div className="container">
            <Row gutter={32}>
                <Col xs={24} sm={18}>
                    {children}
                </Col>
                <Col xs={24} sm={6}>
                    <NavSide/>
                </Col>
            </Row>
        </div>
        <Footer/>
    </div>
)

export {
    reducer,
    initialState,
    stateKey
}