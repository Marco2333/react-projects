import {Pagination } from 'antd';
import {Link} from 'react-router';
import React, {Component} from 'react';

import Alert from '../alert';
import {SERVER_ADDRESS} from '../config/config';

class Gather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'gathers': []
        }
    }

	componentDidMount() {
		fetch(`${SERVER_ADDRESS}/get-gather`).then((res) => {
			if(res.status !== 200) {
				throw new Error('Load Failed, Status:' + res.status);
			}
			res.json().then((data) => {
				if(data.status == 0) {
					this.setState({error: data.message});
				}
				this.setState({gathers: data.info});
			}).catch((error) => {
				console.log(error);
			})
			
		}).catch((error) => {
			console.log(error);
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

		fetch(`${SERVER_ADDRESS}/gather-delete/${id}`).then((res) => {
			if(res.status !== 200) {
				throw new Error('Load Failed, Status ' + res.status);
			}
			res.json().then((data) => {
				if(data.status == 0) {
					this.setState({error: data.message});
				}
				this.setState({
					gathers: this.state.gathers.filter((gather) => {
						return gather.id != id
					})
				});
				alert("删除成功");
			}).catch((error) => {
				console.log(error);
			})
			
		}).catch((error) => {
			console.log(error);
		});
	}

    render() {
		const {page = 1, gathers, pageSize = 15} = this.state;

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
					<Pagination onChange={this.handleChange} defaultPageSize={15} total={gathers.length} />
				</div>
            </div>
        )
    }
}

export {
	Gather
};