import React, {Component} from 'react';

import './index.scss';

class SystemInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		fetch("/get-system-info", {
			credentials: 'include'
		}).then((res) => {
			if(res.status !== 200) {
				throw new Error('Load Failed, Status:' + res.status);
			}
			res.json().then((data) => {
				if(data.status == 0) {
					this.setState({error: data.message});
				}
				else {
					this.setState({...data.info});
				}
			}).catch((error) => {
				console.log(error);
			})
		}).catch((error) => {
			console.log(error);
		});
	}
	
    render() {
		const {serverIP, serverVersion, clientIP, clientVersion, dbVersion} = this.state;

        return (
            <div className="system-info">
                <h3>系统信息 v1.0</h3>
				<ul>
					<li>
						<span>数据库信息</span>
						<p>数据库版本: {dbVersion}</p>
					</li>
					<li>
						<span>服务器信息</span>
						<p>服务器地址: {serverIP}</p>
						<p>服务器类型及版本号: {serverVersion}</p>
					</li>
					<li>
						<span>客户端信息</span>
						<p>客户端地址: {clientIP}</p>
						<p>客户端信息: {clientVersion}</p>
					</li>
				</ul>
            </div>
        )
    }
}

export default SystemInfo;