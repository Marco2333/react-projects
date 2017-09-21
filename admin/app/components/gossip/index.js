import {Pagination} from 'antd';
import {Link} from 'react-router';
import React, {Component} from 'react';

import Alert from '../alert';
import {SERVER_ADDRESS} from '../config/config';


class Gossip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'gossips': []
        }
    }

	componentDidMount() {
		fetch(`${SERVER_ADDRESS}/get-gossip`).then((res) => {
			if(res.status !== 200) {
				throw new Error('Load Failed, Status:' + res.status);
			}
			res.json().then((data) => {
				if(data.status == 0) {
					this.setState({error: data.message});
				}
				this.setState({gossips: data.info});
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

	handleClick = (id) => {
		if(!confirm("确认删除?")) {
			return;
		}
		fetch(`${SERVER_ADDRESS}/gossip-delete/${id}`).then((res) => {
			if(res.status !== 200) {
				throw new Error('Load Failed, Status ' + res.status);
			}
			res.json().then((data) => {
				if(data.status == 0) {
					this.setState({error: data.message});
				}
				this.setState({
					gossips: this.state.gossips.filter(function(gossip) {
						return gossip.id != id
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
		const nowrap = {whiteSpace: "nowrap"};
		const {page = 1, gossips, pageSize = 15} = this.state;

        return (
            <div>
				<Alert status="warning" info="说说列表"/>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Detail</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            gossips.slice((page - 1) * pageSize, page * pageSize).map((gossip) => (
                                <tr key={gossip.id}>
                                    <td>{gossip.id}</td>
                                    <td><Link to={`/gossip-update/${gossip.id}`}>{gossip.detail}</Link></td>
                                    <td style={nowrap}>{gossip.created_at.split(' ')[0]}</td>
                                    <td><a className="operate-delete" onClick={() => this.handleClick(gossip.id)}>删除</a></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
				<div className="pagination">
					<Pagination onChange={this.handleChange} defaultPageSize={15} total={gossips.length} />
				</div>
            </div>
        )
    }
}

export {
	Gossip
};