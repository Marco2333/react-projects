import React, {Component} from 'react';
import {Link} from 'react-router';

import {Pagination } from 'antd';

import Alert from '../alert';

import {SERVER_ADDRESS} from '../../config/config.js';

import './index.scss';

class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'articles': []
        }
    }

	componentDidMount() {
		fetch(`${SERVER_ADDRESS}/get-articles`).then((response) => {
			
			if(response.status !== 200) {
				throw new Error('Fail to get response with status ' + response.status);
				this.setState({error: "Load Failed"});
			}

			response.json().then((responseJson) => {
				if(responseJson.status == 0) {
					this.setState({error: responseJson.message});
				}
				this.setState({articles: responseJson.info});
			}).catch((error) => {
				this.setState({error: "Load Failed"});
			})
			
		}).catch((error) => {
			this.setState({error: "Load Failed"});
		});
	}

	handleChange = (page, pageSize) => {
		this.setState({
			page: page,
			pageSize: pageSize
		});
	}
	
    render() {
		const nowrap = {whiteSpace: "nowrap"};
		const {page = 1, articles, pageSize = 10} = this.state;

        return (
            <div>
				<Alert status="success" info="文章列表"/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>标题</th>
                            <th>类型</th>
                            <th>标签</th>
                            <th>创建时间</th>
                            <th>访问量</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articles.slice((page - 1) * pageSize, page * pageSize).map((article) => (
                                <tr key={article.id}>
                                    <td>{article.id}</td>
                                    <td><Link to={`/article-detail/${article.id}`}>{article.title}</Link></td>
                                    <td>{article.type}</td>
                                    <td>{article.tag}</td>
                                    <td style={nowrap}>{article.created_at}</td>
                                    <td>{article.views}</td>
                                    <td><a className="operate-delete">删除</a></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
				<div className="pagination">
					<Pagination onChange={this.handleChange} defaultPageSize={10} total={articles.length} />
				</div>
            </div>
        )
    }
}

export {
	Articles
};