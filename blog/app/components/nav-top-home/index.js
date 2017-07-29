import React, {Component} from 'react';

import {Link} from 'react-router'

import {Row, Col} from 'antd';

import logoImg from "../../../public/image/logo.png";

import "./index.scss";

class NavTopHome extends Component {
    // state = {
    //     current: 'home'
    // }
    // handleClick = (e) => {
    //     this.setState({current: e.key});
    // }
    render() {
        return (
            <div className="index-nav-top container">
                <Row>
                    <Col xs={24} sm={8} md={12} lg={12}>
                        <div className="site-logo">
                            <img src={logoImg} alt=""/>
                        </div>
                    </Col>
                    <Col xs={0} sm={16} md={12} lg={12}>
                        <ul className="index-nav-top-list">
                            <li className="index-nav-top-item" key="home">
                                <Link to="/home">主页</Link>
                            </li>
                            <li className="index-nav-top-item" key="article">
                                <Link to="/article">文章</Link>
                            </li>
                            <li className="index-nav-top-item" key="archive">
                                <Link to="/timeline">时间轴</Link>
                            </li>
                            <li className="index-nav-top-item" key="gather">
                                <Link to="/gather">滴滴答</Link>
                            </li>
                            <li className="index-nav-top-item" key="life">
                                <Link to="/life">慢生活</Link>
                            </li>
                            <li className="index-nav-top-item" key="gossip">
                                <Link to="/gossip">碎言碎语</Link>
                            </li>
                        </ul>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default NavTopHome;