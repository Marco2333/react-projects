import React, {Component} from 'react';
import {Link} from 'react-router';

import {Pagination } from 'antd';

import Alert from '../alert';

import {SERVER_ADDRESS} from '../../config/config.js';

import './index.scss';

class Gather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'gathers': []
        }
    }

	componentDidMount() {
		fetch(`${SERVER_ADDRESS}/get-gather`).then((response) => {
			
			if(response.status !== 200) {
				throw new Error('Fail to get response with status ' + response.status);
				this.setState({error: "Load Failed"});
			}

			response.json().then((responseJson) => {
				if(responseJson.status == 0) {
					this.setState({error: responseJson.message});
				}
				this.setState({gathers: responseJson.info});
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

	handleCilck = (id) => {
		if(!confirm("确认删除?")) {
			return;
		}

		fetch(`${SERVER_ADDRESS}/gather-delete/${id}`).then((response) => {
			
			if(response.status !== 200) {
				throw new Error('Fail to get response with status ' + response.status);
				this.setState({error: "Load Failed"});
			}

			response.json().then((responseJson) => {
				if(responseJson.status == 0) {
					this.setState({error: responseJson.message});
				}
				this.setState({gathers: this.state.gathers.filter(function(gather) {
					return gather.id != id
				})});
				alert("删除成功");
			}).catch((error) => {
				this.setState({error: "Load Failed"});
			})
			
		}).catch((error) => {
			this.setState({error: "Load Failed"});
		});
	}

    render() {
		const {page = 1, gathers, pageSize = 10} = this.state;

        return (
            <div>
				<Alert status="info" info="收藏列表"/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>标题</th>
                            <th>标签</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            gathers.slice((page - 1) * pageSize, page * pageSize).map((gather) => (
                                <tr key={gather.id}>
                                    <td>{gather.id} </td>
                                    <td><Link to={`/gather-update/${gather.id}`}>{gather.title}</Link></td>
                                    <td>{gather.tag}</td>
                                    <td>{gather.created_at}</td>
                                    <td><a className="operate-delete" onClick={() => {this.handleCilck(gather.id)}}>删除</a></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
				<div className="pagination">
					<Pagination onChange={this.handleChange} defaultPageSize={10} total={gathers.length} />
				</div>
            </div>
        )
    }
}

export {
	Gather
};