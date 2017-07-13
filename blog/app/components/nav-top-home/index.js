import React, {Component} from 'react';
import ReacDOM from 'react-dom';

import {Row, Col, Menu} from 'antd';

class NavTopHome extends Component {
    state = {
        current: 'home'
    }
    handleClick = (e) => {
        this.setState({current: e.key});
    }
    render() {
        return (
            <div className="nav-top container">
                <Row>
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <span>Ma</span>
                        <span>rco</span>
                        <span>南行北望</span>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal">
                            <Menu.Item key="home">
                                主页
                            </Menu.Item>
                            <Menu.Item key="artical">
                                文章
                            </Menu.Item>
                            <Menu.Item key="gather">
                               滴滴答
                            </Menu.Item>
                            <Menu.Item key="life">
                                慢生活
                            </Menu.Item>
                            <Menu.Item key="gossip">
                                碎言碎语
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default NavTopHome;