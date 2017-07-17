import React, {Component} from 'react';

import {Link} from 'react-router';
import {Row, Col} from 'antd';

class ArticalItem extends Component {
    render() {
        const {id, title, category, tag, created_at, abstract, views, img_url} = this.props;

        return (
            <Link to={`/artical/${id}`}>
                <div className="artical-item">
                    {
                       img_url ? (
                            <Row>
                                <Col xs={0} sm={8}>
                                    <img src={img_url} alt=""/>
                                </Col>
                                <Col xs={24} sm={16}>
                                    <div className="artical-body">
                                        <h4>{title}</h4>
                                        <p>
                                            <span>post @ {created_at}</span>
                                            <span>分类: {category}</span>
                                            <span>Tag: {tag}</span>
                                        </p>
                                        <div>
                                            {abstract} ...
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                       ) : (
                           <div className="artical-body">
                                <h4>{title}</h4>
                                <p>
                                    <span>post @ {created_at}</span>
                                    <span>分类: {category}</span>
                                    <span>Tag: {tag}</span>
                                </p>
                                <div>
                                    {abstract} ...
                                </div>
                           </div>
                       )
                    }
                   
                </div>
            </Link>
        )
    }
}