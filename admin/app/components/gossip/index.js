import React, {Component} from 'react';

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
	
    render() {
        
        return (
            <div>
                <table className="table table-bordered table-striped">
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
                            this.state.gossips.map((gossip) => (
                                <tr key={gossip.id}>
                                    <td>{gossip.id} </td>
                                    <td>{gossip.detail}</td>
                                    <td>{gossip.created_at}</td>
                                    <td><span className="gossip-delete">删除</span></td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        )
    }
}

export {
	Gossip
};