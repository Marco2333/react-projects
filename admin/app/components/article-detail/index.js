import React, {Component} from 'react';

import {Form, Input, Button, Select} from 'antd';

import Alert from '../alert';
import Ueditor from '../ueditor';
import {SERVER_ADDRESS} from '../../config/config';

const FormItem = Form.Item;
const Option = Select.Option;

class ArticleDeatil extends Component {
	constructor(props) {
		super(props);
		this.state = {
			article: {}
		}
	}

	componentDidMount() {
		if(this.props.id != null) {
			fetch(`${SERVER_ADDRESS}/get-article-detail/${this.props.id}`).then((response) => {
				
				if(response.status !== 200) {
					throw new Error('Fail to get response with status ' + response.status);
					this.setState({error: "Load Failed"});
				}

				response.json().then((responseJson) => {
					if(responseJson.status == 0) {
						this.setState({error: responseJson.message});
					}
					this.setState({article: responseJson.info});
				}).catch((error) => {
					this.setState({error: "Load Failed"});
				})
				
			}).catch((error) => {
				this.setState({error: "Load Failed"});
			});
		}
	}
	

	render() {
		let {body} = this.state.article;
		const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

		const titleError = isFieldTouched('title') && getFieldError('title');
		const tagError = isFieldTouched('tag') && getFieldError('tag');

		const prefixType = getFieldDecorator('type', {
			initialValue: '1'
		})(
			<Select>
				<Option value="1">原创</Option>
				<Option value="2">转载</Option>
				<Option value="3">翻译</Option>
			</Select>
		);

		return (
			<div>
				<Alert status="info" info="文章更新"/>
				<Form layout="inline">
					<FormItem
						validateStatus={titleError ? 'error' : ''}
						help={titleError || ''}
						label="文章标题"
					>
					{
						getFieldDecorator('title', {
							rules: [{required: true, message: 'Please input title!'}]
						})(
							<Input addonBefore={prefixType} placeholder="title" style={{width: 400}}/>
						)
					}
					</FormItem>
					<FormItem
						validateStatus={tagError ? 'error' : ''}
						help={tagError || ''}
						label="文章标签"
					>
					{
						getFieldDecorator('tag', {
							rules: [{required: true, message: 'Please input tag!'}]
						})(
							<Input placeholder="tag" />
						)
					}
					</FormItem>
					<FormItem label="文章分类">
					{
						getFieldDecorator('category', {
							initialValue: '1'
						})(
							<Select style={{width: 100}}>
								<Option value="1">Html</Option>
								<Option value="2">Css</Option>
								<Option value="3">Javascript</Option>
							</Select>
						)
					}
					</FormItem>
					
					<Ueditor content={body} />
					<div style={{textAlign: "right"}}>
						<FormItem>
							<Button type="primary" onClick={this.submit}>
								提交
							</Button>
						</FormItem>
					</div>
				</Form>
			</div>
		)
	}
}

const WrappedArticleDetail = Form.create()(ArticleDeatil);

export default WrappedArticleDetail;