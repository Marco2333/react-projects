import React, {Component} from 'react';

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
	
    render() {
        
        return (
            <div>
                <table className="table table-bordered table-striped">
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
                            this.state.articles.map((article) => (
                                <tr key={article.id}>
                                    <td>{article.id}</td>
                                    <td>{article.title}</td>
                                    <td>{article.type}</td>
                                    <td>{article.tag}</td>
                                    <td>{article.created_at}</td>
                                    <td>{article.views}</td>
                                    <td><span className="article-delete">删除</span></td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        )
    }
}

export default Articles;