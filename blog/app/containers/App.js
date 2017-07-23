import React from 'react';

import {Row, Col, BackTop} from 'antd';

import Banner from '../components/home-banner';

import Breadcrumb from '../components/bread-crumb';
import NavSide from '../components/nav-side';
import NavTop from '../components/nav-top';
import Footer from '../components/footer';

export default({children, routes, params}) => {    
    let isHome = routes.length === 2 && routes[1].name === 'home';

    return (
        <div>
            <NavTop/> 
            <div className="container">                    
                <Breadcrumb routes={routes} params={params}/>
            </div>
            {isHome ? <Banner/> : null}

            <div className="container">
                <Row gutter={32}>
                    <Col xs={24} sm={18}>
                        {children}
                    </Col>
                    <Col xs={24} sm={6}>
                        <NavSide />
                    </Col>
                </Row>
            </div>
            <Footer/>
            
            <BackTop />  
        </div>
    )
}