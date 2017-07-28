import React, {Component} from 'react';

import {Link} from 'react-router'

import {Row, Col, Input, Icon, Popover} from 'antd';

import logoImg from "../../../public/image/logo.png";

import "./index.scss";

class NavTop extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            keyword: '',
            link: '',
            visible: false
        };

        this.onSearch = this.onSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }

    static contextTypes = {
        router: React.PropTypes.object
    }

    onSearch(keyword) {
        this.setState({ visible: false });
        keyword = keyword.substr(0, 15);
        this.context.router.push(`/search/${keyword}`);
    }

    handleChange(event) {
        this.setState({keyword: event.target.value});
    }

    onClick(event) {
         this.setState({
             link: event.target.getAttribute('data-key')
         })
    }

    handleVisibleChange(visible) {
        this.setState({ visible });
    }

    render() {
        const links = [
            {key: "home", text: '主页'},
            {key: "artical", text: '文章'},
            {key: "timeline", text: '归档'},
            {key: "gather", text: '点滴'},
            {key: "gossip", text: '慢生活'},
            // {key: "gossip", text: '碎言碎语'}
        ];

        let currLink = this.state.link;
        const content = (
            <Col sm={0}>
                <div onClick={this.onClick}>
                    {
                        links.map((item) => (
                            item.key === currLink
                            ? <p className="popover-item active" key={item.key}><Link to={item.key} data-key={item.key}>{item.text}</Link></p>
                            : <p className="popover-item" key={item.key}><Link to={item.key} data-key={item.key}>{item.text}</Link></p>
                        ))
                    }
                    <div style={{padding: "10px"}}>
                        <Input.Search
                            size="large"
                            placeholder="Search"
                            value={this.state.keyword}
                            onSearch={this.onSearch}
                            onChange={this.handleChange}/>
                    </div>
                </div>
            </Col>
        );

        return (
            <div className="nav-top-wrap">
                <div className="container">
                    <div className="site-logo">
                        <h2>
                            <span>Ma</span><span>rco</span>
                        </h2>
                        <p>我想去天堂，但我不想死</p>
                    </div>
                    
                    <div className="nav-top-popover">
                        <Col xs={24} sm={0}>
                            <Popover content={content} trigger="click" placement="bottomRight" 
                                visible={this.state.visible} 
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <Icon type={this.state.visible ? 'menu-unfold' : 'menu-fold'} />
                            </Popover>
                        </Col>
                    </div>
                </div>
                <Row>
                    <Col xs={0} sm={24}>
                        <div className="nav-top">
                            <div className="container">
                                <ul onClick={this.onClick}>
                                    {
                                        links.map((item) => (
                                            <li className="nav-top-item" key={item.key}>
                                                <Link to={`/${item.key}`} data-key={item.key}>{item.text}</Link>
                                            </li>
                                        ))
                                    }
                                    <div className="nav-top-search">
                                        <Input.Search
                                            size="large"
                                            placeholder="Search"
                                            value={this.state.keyword}
                                            onSearch={this.onSearch}
                                            onChange={this.handleChange}/>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default NavTop;