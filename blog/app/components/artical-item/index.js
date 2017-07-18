import React, {Component} from 'react';

import {Link} from 'react-router';
import {Row, Col} from 'antd';

import './index.scss';

class ArticalItem extends Component {
    render() {
        const {id, title, theme, tag, created_at, abstract, views, img_url} = this.props;

        return (
            <div className="artical-item">
                {
                    img_url ? (
                        <Row>
                            <Col xs={0} sm={8}>
                                <Link to={`/artical/${id}`}><img src={img_url} alt=""/></Link>
                            </Col>
                            <Col xs={24} sm={16}>
                                <div className="artical-body">
                                    <Link to={`/artical/${id}`}><h4>{title}</h4></Link>
                                    <p>
                                        <span>post @ {created_at}</span>
                                        &nbsp;&nbsp;
                                        <span>category: {theme}</span>
                                        &nbsp;&nbsp;
                                        <span>Tag: {tag}</span>
                                    </p>
                                    <div className="artical-abstract">
                                        {abstract} ...
                                    </div>
                                    <p className="artical-link"><Link to={`/artical/${id}`}>阅读全文 >></Link></p>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <div className="artical-body">
                            <Link to={`/artical/${id}`}><h4>{title}</h4></Link>
                            <p>
                                <span>post @ {created_at}</span>
                                &nbsp;&nbsp;
                                <span>category: {theme}</span>
                                &nbsp;&nbsp;
                                <span>Tag: {tag}</span>
                            </p>
                            <div className="artical-abstract">
                                {abstract} ...
                            </div>
                            <span className="artical-link"><Link to={`/artical/${id}`}>阅读全文 >></Link></span> 
                        </div>
                    )
                }
            </div>
        )
    }
}

export default ArticalItem;