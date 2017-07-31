import React, {Component}  from 'react';

import {Pagination} from 'antd';

import ArticleItem from '../article-item';
import ListCarousel from '../list-carousel';

import WOW from 'wowjs';

import {SERVER_ADDRESS} from '../../config/config';


class Articles extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			'count': this.props.count || 15,
			'articles': [],
			'total': 0,
			'current': this.props.pagination === false ? undefined : 1
		}
	}

    componentDidMount() {
		const {pagination = true, ...params} = this.props;

		if(pagination === true)
			params['current'] = 1;

		this.getArticles(params);
		
    }

	componentWillReceiveProps(nextProps) {
		if(this.props.category != null && 
			nextProps.category != null && 
			this.props.category != nextProps.category || (
			this.props.tag != null && 
			nextProps.tag != null && 
			this.props.tag != nextProps.tag) || (
			this.props.keyword != null && 
			nextProps.keyword != null && 
			this.props.keyword != nextProps.keyword
		)) {	
			const {pagination = true, ...params} = nextProps;
			if(pagination === true)
				params['current'] = 1;

			this.getArticles(params);
		}
	}
	
	getUrl = ({current, count = 15, type, category, keyword, tag}) => {
		let url = `${SERVER_ADDRESS}/get-articles?count=${count}`;
		
		if(current != null) {
			url += `&current=${current}`;
		}
		if(tag != null) {
			url += `&tag=${tag}`;
		}
		if(keyword != null) {
			url += `&keyword=${keyword}`;
		}
		if(category != null) {
			url += `&category=${category}`;
		}
		if(type != null && +type !== 0) {
			url += `&type=${type}`;
		}

		return url;
	}

	getArticles = (params) => {
		let url = this.getUrl(params);
	
		fetch(url).then((response) => {
			
			if(response.status !== 200) {
				throw new Error('Fail to get response with status ' + response.status);
				this.setState({error: "Load Failed"});
			}

			response.json().then((responseJson) => {
				if(responseJson.status == 0) {
					this.setState({error: responseJson.message});
				}
				this.setState({...responseJson.info});
				new WOW().init();
		
			}).catch((error) => {
				this.setState({error: "Load Failed"});
			})
			
		}).catch((error) => {
			this.setState({error: "Load Failed"});
		});
	}

	handleChange = (page, count) => {
		this.setState({
			current: page,
			count: count
		});

		const {...params} = this.props;

		params['current'] = page;
		params['count'] = count;

		this.getArticles(params);
	}

    render() {
        const {pagination = true, carousel = false} = this.props;
		let {count, current, articles, total} = this.state;
		
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

export default Articles;