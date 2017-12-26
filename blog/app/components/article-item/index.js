import {Row, Col} from 'antd';
import {Link} from 'react-router';
import React, {Component, PropTypes} from 'react';

import './index.scss';
import {showMessage} from '../common/show';

class ArticleItem extends Component {
	handleMouseOver = () => {
		if(loadlive2d) {
			showMessage(document.querySelector('.live2d-message'), 
				`要看看 <a href="/article-detail/${this.props.id}">${this.props.title}</a> 么？`, 3500);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.id != nextProps.id;
	}

	render() {
		const {id, title, theme, tag, created_at, abstract, views} = this.props;

		return (
			<div className="article-item wow zoomIn animated">
				<div className="article-body" onMouseOver={this.handleMouseOver}>
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
			</div>
		)
	}
}

ArticleItem.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	abstract: PropTypes.string.isRequired
};

export default ArticleItem;