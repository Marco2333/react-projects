import React, {Component} from 'react';
import {Button, Row, Col, Input} from 'antd';

import {SERVER_ADDRESS} from '../../config/config';

const {TextArea} = Input;

class GossipDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		let id = this.props.id;

		if(id != null) {
			fetch(`${SERVER_ADDRESS}/gossip/${id}`).then((response) => {
				
				if(response.status !== 200) {
					throw new Error('Load Failed, Status:' + response.status);
					this.setState({error: "Load Failed"});
				}

				response.json().then((responseJson) => {
					if(responseJson.status == 0) {
						this.setState({error: responseJson.message});
					}
					else {
						this.setState({...responseJson.info});
					}
				}).catch((error) => {
					this.setState({error: "Load Failed"});
				})
				
			}).catch((error) => {
				this.setState({error: "Load Failed"});
			});
		}
	}

	handleInput = (e) => {
		this.setState({detail: e.target.value});
	}

	handleSubmit = (e) => {
		e.preventDefault();
	}

	render() {
		const {detail, img} = this.state;

		return (
			<form action="" onSubmit={this.handleSubmit}>
				<p style={{fontSize: 13, marginBottom: 3}}>说说内容：</p>
				<TextArea name="detail" value={detail} style={{minHeight: 100}} onChange={this.handleInput}></TextArea>
				<div style={{textAlign: "right"}}>
					<Button type="primary" htmlType="submit" size="large" style={{marginTop: 8}}>
						提交
					</Button>
				</div>
			</form>
		)
	}
}

export default GossipDetail;