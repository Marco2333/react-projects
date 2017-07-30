import React, {Component}  from 'react';
import {connect} from 'react-redux';

import {Pagination} from 'antd';

import ArticleItem from '../article-item';
import ListCarousel from '../list-carousel';

import {getArticles} from './actions';

export const stateKey = "articles";
export const initialState = {articles: []};

class Articles extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			'count': this.props.count || 15,
			'current': this.props.pagination === false ? undefined : 1
		}
	}

    componentDidMount() {
		const {getArticles, pagination = true, ...params} = this.props;

		if(pagination === true)
			params['current'] = 1;

		console.log(1);
		getArticles(params);
    }

	componentWillReceiveProps(nextProps) {
		if(nextProps._reset) {
			const {getArticles, pagination = true, ...params} = this.props;
			if(pagination === true)
				params['current'] = 1;

			console.log(3);
			getArticles(params);
		}
	}

	componentWillUnmount() {
		console.log(-1);
	}
	

	handleChange = (page, count) => {
		this.setState({
			current: page,
			count: count
		});

		const {getArticles, ...params} = this.props;

		params['current'] = page;
		params['count'] = count;

		getArticles(params);
	}

    render() {
        const {articles, total, pagination = true, carousel = false} = this.props;
		let {count, current} = this.state;
		
        return (
            <div>
				 { 
					carousel 
                    ? <ListCarousel links={
                        articles.map(article => {
                            return {
                                link: `/article-detail/${article.id}`,
                                value: `${article.title}`
                            } 
                      })} /> : null 
                }
                <div className="article-list">
					{
						articles.map(article => {
							return (
								<div key={article.id}>
									<ArticleItem {...article}/>
								</div>
							)
						})
					}
				</div>
				{
					pagination && total ?
					<div className="pagination">
						<Pagination defaultCurrent={1} pageSize={count} current={current} total={total} 
						onChange={this.handleChange} onShowSizeChange={this.handleChange} showSizeChanger /> 
					</div>
					: null
				}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state[stateKey]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticles: (params) => {
            dispatch(getArticles(params))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);