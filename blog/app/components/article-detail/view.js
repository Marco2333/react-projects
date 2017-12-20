import {Icon} from 'antd';
import marked from 'marked';
import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';

import {getArticleDetail} from './actions';

import './index.scss';

export const stateKey = 'detail';

class ArticleDetail extends Component {

	componentDidMount() {
		let style = document.createElement("link");
		style.setAttribute('rel', 'stylesheet');
		style.setAttribute('href', '/static/syntaxhighlighter/styles/shCoreFadeToGrey.css')
		document.getElementsByTagName('head')[0].appendChild(style);

		if (typeof SyntaxHighlighter === 'undefined') {
			let scriptArr = [
				"shBrushCss.js",
				"shBrushPhp.js",
				"shBrushXml.js",
				"shBrushJScript.js",
				"shBrushPlain.js",
				"shBrushBash.js",
				"shBrushCpp.js"
			];
			
			let script = document.createElement("script");
			script.setAttribute('src', '/static/syntaxhighlighter/scripts/shCore.js');
			document.getElementsByTagName('head')[0].appendChild(script);

			script.onload = script.onreadystatechange = function() {
				if(!this.readyState || this.readyState == 'complete') {
					SyntaxHighlighter._count = 0;

					scriptArr.forEach((scriptName) => {
						script = document.createElement("script");
						let url = `/static/syntaxhighlighter/scripts/${scriptName}`;

						script.setAttribute('src', url);
						document.getElementsByTagName('head')[0].appendChild(script);

						script.onload = script.onreadystatechange = function() {
							if(!this.readyState || this.readyState == 'complete') {
								SyntaxHighlighter._count++;
								
								if(SyntaxHighlighter._count >= 7) {
									SyntaxHighlighter.all();
									SyntaxHighlighter.highlight();
								}
							}
						}
					});
				}
			}
		}

		let {id, getDetail} = this.props;
		getDetail(id);
	}

	componentWillReceiveProps(nextProps) {
		let {id, getDetail} = this.props;

		if (id != nextProps.id) {
			getDetail(nextProps.id);
		}
	}

	componentDidUpdate() {
		if (typeof SyntaxHighlighter != 'undefined' && SyntaxHighlighter._count == 7) {
			SyntaxHighlighter.highlight();
		}
	}

	render() {
		let {title, body = '', tag, theme, created_at, updated_at, views, type, markdown = false} = this.props.detail;

		if(markdown == '1') {
			marked.setOptions({
				highlight: function (code) {
					return require('highlight.js').highlightAuto(code).value;
				}
			});
			body = marked(body);
		}

		return (
			<div className="article-detail">
				<h3 className="blog-title">
					{
						type == 2
						? "[转]"
						: type == 3
						? "[译]"
						: ""
					}
					{title}
				</h3>
				<div className="blog-top">
					<span>
						Last Modified : &nbsp; 
						{
							updated_at
							? updated_at
							: created_at
						}
					</span>
					<span className="spliter"></span>
					<span>{theme}</span>
					<span className="spliter"></span>
					<span><Icon type="tag"/>&nbsp; {tag}</span>
					<span className="spliter"></span>
					<span>浏览&nbsp; {views}</span>
				</div>
				<div
					className={`blog-content ${markdown == '1' ? "markdown-wrap" : ""}`}
					dangerouslySetInnerHTML={{__html: body}}>
				</div>
			</div>
		)
	}
}

ArticleDetail.propTypes = {
	getDetail: PropTypes.func.isRequired
};

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