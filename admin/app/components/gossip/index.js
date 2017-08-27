import React, {Component} from 'react';
import {Link} from 'react-router';

import {Pagination } from 'antd';

import Alert from '../alert';

import {SERVER_ADDRESS} from '../../config/config.js';

import './index.scss';

class Gossip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'gossips': []
        }
    }

	componentDidMount() {
		fetch(`${SERVER_ADDRESS}/get-gossip`).then((response) => {
			
			if(response.status !== 200) {
				throw new Error('Fail to get response with status ' + response.status);
				this.setState({error: "Load Failed"});
			}

			response.json().then((responseJson) => {
				if(responseJson.status == 0) {
					this.setState({error: responseJson.message});
				}
				this.setState({gossips: responseJson.info});
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
		const {page = 1, gossips, pageSize = 10} = this.state;

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
                                    <td><Link to={`/gossip-detail/${gossip.id}`}>{gossip.detail}</Link></td>
                                    <td style={nowrap}>{gossip.created_at.split(' ')[0]}</td>
                                    <td><a className="operate-delete">删除</a></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
				<div className="pagination">
					<Pagination onChange={this.handleChange} defaultPageSize={10} total={gossips.length} />
				</div>
            </div>
        )
    }
}

export {
	Gossip
};