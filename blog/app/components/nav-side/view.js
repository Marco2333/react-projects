import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {Icon} from 'antd';

import {getNavInfo} from './actions';

import './index.scss';

import bgImg from "../../../public/image/portrait_bg.jpg";
import meImg from "../../../public/image/me.jpg";


export const stateKey = "navSide";

class NavSide extends Component {
    componentDidMount() {
        this.props.getNavInfo();
    }

    render() {
        const {portrait, articals, categorys, tags, links} = this.props;

        return (
            <div className="nav-side">
                <div className="panel user-introduction">
                    <img src={bgImg} alt=""/>
                    <div className="panel-body">
                        <div className="user-portrait">
                            <img src={meImg} alt=""/>
                            <h3>Marco</h3>
                            <p>{portrait ? portrait.intro : ''}</p>
                        </div>
                        <div className="statistics">
                            <span className="statistic-item">随笔 - {portrait ? portrait.articalCount : ''}</span>
                            <span className="spliter"></span>
                            <span className="statistic-item">访问 - {portrait ? portrait.viewCount : ''}</span>
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-heading">FOLLOW ME</div>
                    <div className="panel-body text-center">
                        <p className="followme-link">
                            <a href="https://github.com/Marco2333" target="_blank"><Icon type="github"/></a>
                        </p>
                        <p className="followme-link" style={{transform: "rotate(180deg)"}}>
                            <a href="https://github.com/Marco2333" target="_blank"><Icon type="github"/></a>
                        </p>
                        <p className="followme-link" style={{transform: "rotate(90deg)"}}>
                            <a href="https://github.com/Marco2333" target="_blank"><Icon type="github"/></a>
                        </p>
                        <p className="followme-link" style={{transform: "rotate(270deg)"}}>
                            <a href="https://github.com/Marco2333" target="_blank"><Icon type="github"/></a>
                        </p>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-heading">文章列表</div>
                    <div className="panel-body">
                        <ol>
                            {
                                articals ? 
                                articals.map(artical => (
                                    <li key={artical.id}>
                                        <Link to={`/artical/${artical.id}`}>{artical.title}</Link>
                                    </li>
                                ))
                                : ''
                            }
                        </ol>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-heading">文章分类</div>
                    <div className="panel-body">
                        <ul>
                            {
                                categorys ?
                                categorys.map(category => (
                                    <li key={category.id}>
                                        <Link to={`/category/${category.id}`}>{category.theme}</Link>
                                    </li>
                                ))
                                : ''
                            }
                        </ul>
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-heading">云标签</div>
                    <div className="panel-body">
                        <ul>
                            {
                                tags ?
                                tags.map((tag, index) => (
                                    <li key={index}>
                                        <Link to={`/tag/${tag}`}>{tag}</Link>
                                    </li>
                                ))
                                : ''
                            }
                        </ul> 
                    </div>
                </div>
                <div className="panel">
                    <div className="panel-heading">友情链接</div>
                    <div className="panel-body">
                        <ul>
                            {
                                links ?
                                links.map(link => (
                                    <li key={link.id}>
                                        <Link to={link.url}>{link.text}</Link>
                                    </li>
                                ))
                                : ''
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...(state[stateKey] || {})
    }
}

const mapDispatchToProps = (dispatch) => ({
    getNavInfo: () => dispatch(getNavInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavSide);