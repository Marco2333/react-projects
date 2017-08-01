import React, {Component} from 'react';

import {Link} from 'react-router';
import {Row, Col} from 'antd';

import './index.scss';

class ArticleItem extends Component {
    render() {
        const {id, title, theme, tag, created_at, abstract, views, img_url} = this.props;

        return (
            <div className="article-item wow zoomIn animated">
                {
                    img_url ? (
                        <Row>
                            <Col xs={0} sm={8}>
                                <Link to={`/article-detail/${id}`}><img src={img_url} alt=""/></Link>
                            </Col>
                            <Col xs={24} sm={16}>
                                <div className="article-body">
                                    <Link to={`/article-detail/${id}`}><h4>{title}</h4></Link>
                                    <p>
                                        <span>post @ {created_at}</span>
                                        &nbsp;&nbsp;&nbsp;
                                        <span>category: {theme}</span>
                                        &nbsp;&nbsp;&nbsp;
                                        <span>浏览: {views}</span>
                                    </p>
                                    <div className="article-abstract">
                                        {abstract} ...
                                    </div>
                                    <p className="article-link"><Link to={`/article-detail/${id}`}>阅读全文 >></Link></p>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <div className="article-body">
                            <Link to={`/article-detail/${id}`}><h4>{title}</h4></Link>
                            <p>
                                <span>post @ {created_at}</span>
                                &nbsp;&nbsp;&nbsp;
                                <span>category: {theme}</span>
                                &nbsp;&nbsp;&nbsp;
                                <span>浏览: {views}</span>
                            </p>
                            <div className="article-abstract">
                                {abstract} ...
                            </div>
                            <span className="article-link"><Link to={`/article-detail/${id}`}>阅读全文 >></Link></span> 
                        </div>
                    )
                }
            </div>
        )
    }
}

export default ArticleItem;