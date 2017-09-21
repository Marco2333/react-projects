import React, {Component} from 'react';
import {Button, Input, Upload, Icon} from 'antd';

import {SERVER_ADDRESS} from '../config/config';

const {TextArea} = Input;

class GossipDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	static contextTypes = {
		router: React.PropTypes.object
	}

	componentDidMount() {
		let id = this.props.id;

		if(id != null) {
			fetch(`${SERVER_ADDRESS}/gossip/${id}`).then((res) => {
				if(res.status !== 200) {
					throw new Error('Load Failed, Status:' + res.status);
				}
				res.json().then((data) => {
					if(data.status == 0) {
						this.setState({error: data.message});
					}
					else {
						this.setState({detail:  data.info.detail});
					}
				}).catch((error) => {
					console.log(error);
				})
				
			}).catch((error) => {
				console.log(error);
			});
		}
	}

	handleInput = (e) => {
		this.setState({detail: e.target.value});
	}

	handleClick = (e) => {
		e.preventDefault();
		const {file, detail = ''} = this.state;

		if(detail.trim() == '') {
			alert("内容不能为空！");
			return
		}

		const formData = new FormData();
		if(this.props.id != null) {
			formData.append('id', this.props.id);
		}
		if(file != null) {
			formData.append('file', file);
		}
		formData.append('detail', detail);
		
		fetch(`${SERVER_ADDRESS}/gossip-submit`, {
			method: 'POST',
			body: formData
		}).then((res) => {
			if(res.status !== 200) {
				throw new Error('Load Failed, Status:' + res.status);
			}
			res.json().then((data) => {
				if(data.status == 0) {
					this.setState({error: data.message});
				}
				else {
					alert('提交成功！');
					if(this.props.id == null) {
						this.context.router.push(`/gossip`);
					}
				}
			}).catch((error) => {
				console.log(error);
			})
		}).catch((error) => {
			console.log(error);
		});
	}

	render() {
		const pStyle = {
			fontSize: 13, 
			margin: "10px 0 4px"
		};
		const {detail, img} = this.state;
		const props = {
			action: '',
			listType: 'picture',
			onRemove: (file) => {
				this.setState({file: null})	
			},
			beforeUpload: (file) => {
				this.setState({file: file});
				return false;
			},
			fileList: this.state.file ? [this.state.file] : null
		}

		return (
			<div>
				<p style={{...pStyle, marginTop: 0}}>图片上传：</p>
				<Upload {...props}>
					<Button>
						<Icon type="upload" /> upload
					</Button>
				</Upload>
				<p style={pStyle}>说说内容：</p>
				<TextArea name="detail" value={detail} style={{minHeight: 100}} onChange={this.handleInput}></TextArea>
				<div style={{textAlign: "right"}}>
					<Button type="primary" size="large" style={{marginTop: 8}} onClick={this.handleClick}
						disabled={this.state.detail ? false : true}>
						提交
					</Button>
				</div>
			</div>
		)
	}
}

export default GossipDetail;