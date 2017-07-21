import React from 'react';

import {Row, Col} from 'antd';

// import NavTopHome from '../components/nav-top-home';
import Banner from '../components/home-banner';

import NavSide, {reducer, initialState, stateKey} from '../components/nav-side';
import NavTop from '../components/nav-top';
import Footer from '../components/footer';


export default({children}) => {
    let isHome = children.type && children.type.name === 'Home';

    return (
        <div>
            <NavTop/>
            {isHome ? <Banner /> : null}
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
}

export {reducer, initialState, stateKey}