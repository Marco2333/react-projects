import React, {Component} from 'react';

import {Link} from 'react-router'

import {Row, Col, Input} from 'antd';

import logoImg from "../../../public/image/logo.png";

import "./index.scss";

class NavTop extends Component {
    render() {
        return (
            <div className="bg-white">
                <div className="container">
                    <Row>
                        <Col xs={24} sm={18}>
                            <div className="site-logo">
                               <img src={logoImg} alt=""/>
                            { //         <span className="spliter"></span>
                            //       <span className="site-sub-logo">莫名其妙</span>
                            }   
                            </div>
                        </Col>
                        <Col xs={0} sm={6}>
                            <div className="nav-top-search">
                                <Input.Search size="large"/>
                            </div>
                        </Col>
                    </Row>       
                </div>
                <div className="nav-top">
                    <div className="container">
                        <ul>
                            <li className="nav-top-item">
                                <Link to="/home">首页</Link>
                            </li>
                            <li className="nav-top-item">
                                <Link to="/artical">文章</Link>
                            </li>
                            <li className="nav-top-item">
                                <Link to="/timeline">时间轴</Link>
                            </li>
                            <li className="nav-top-item">
                                <Link to="/gather">滴滴答</Link>
                            </li>
                            <li className="nav-top-item">
                                <Link to="/life">慢生活</Link>
                            </li>
                            <li className="nav-top-item">
                                <Link to="/gossip">碎言碎语</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavTop;