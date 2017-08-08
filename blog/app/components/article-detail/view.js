import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Icon} from 'antd';

// import SyntaxHighlighter from 'syntaxhighlighter';
import Highlight from 'react-highlight';

import {getArticleDetail} from './actions';

import '../../../node_modules/highlight.js/styles/monokai.css'

import './index.scss';

export const stateKey = 'detail';

class ArticleDetail extends Component {

    componentDidMount() {
        let {id, getDetail} = this.props; 
		getDetail(id);
		// console.log(SyntaxHighlighter);
    }

    componentWillReceiveProps(nextProps) {
        let {id, getDetail} = this.props;

        if (id != nextProps.id) {
            getDetail(nextProps.id);
        }
    }

    render() {
        const {title, body, tag, theme, created_at, updated_at, views, type} = this.props.detail;
        return (
            <div className="article-detail">
                <h3 className="blog-title">
                    {
                        type == 2 ? "[转]"
                        : type == 3 ? "[译]" : ""
                    }
                    {title}
                </h3>
                <div className="blog-top">
                    <span>
                        Last Modified : &nbsp; 
                        {
                            updated_at ? updated_at : created_at
                        }
                    </span>
					<span className="spliter"></span>
                    <span>{theme}</span>
					<span className="spliter"></span>
                    <span><Icon type="tag" />&nbsp;  {tag}</span>
					<span className="spliter"></span>
                    <span>浏览&nbsp;  {views}</span>
                </div>
				<div className="blog-content" dangerouslySetInnerHTML={{__html: body}}>
				</div>           
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state[stateKey].id || null,
        detail: state[stateKey]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetail: (id) => {
            dispatch(getArticleDetail(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);