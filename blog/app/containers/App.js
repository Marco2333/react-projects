import React from 'react';
import {Link} from 'react-router';

import {Row, Col, BackTop} from 'antd';

import Banner from '../components/home-banner';

import Breadcrumb from '../components/bread-crumb';
import NavSide from '../components/nav-side';
import NavTop from '../components/nav-top';
import Footer from '../components/footer';

function itemRender(route, params, routes, paths) {
	const last = routes.indexOf(route) === routes.length - 1;

	return last 
			?
			routes.length === 2 && routes[1].name === 'home'
			? null : <span>{route.breadcrumbName}</span> 
			:
			routes.length === 2 && routes[1].name === 'home'
			? 
			<span>{route.breadcrumbName}</span> 
			: <Link to={"/" + paths.join('/')}>{route.breadcrumbName}</Link>
}

export default({children, ...rest}) => {    
    let isHome = rest.routes.length === 2 && rest.routes[1].name === 'home';

    return (
        <div>
            <NavTop/> 
            <div className="container">                    
                <Breadcrumb {...rest} itemRender={itemRender} />
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