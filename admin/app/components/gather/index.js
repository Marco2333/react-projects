import React, {Component} from 'react';

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
	
    render() {
        
        return (
            <div>
                <table className="table table-bordered table-striped">
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
                            this.state.gathers.map((gather) => (
                                <tr key={gather.id}>
                                    <td>{gather.id} </td>
                                    <td>{gather.title}</td>
                                    <td>{gather.tag}</td>
                                    <td>{gather.created_at}</td>
                                    <td><span className="gather-delete">删除</span></td>
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
	Gather
};