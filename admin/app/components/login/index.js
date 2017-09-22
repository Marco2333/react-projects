import md5 from 'md5';
import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';

import {SERVER_ADDRESS} from '../config/config';

import './index.scss';

class LoginForm extends Component {
	static contextTypes = {
		router: React.PropTypes.object
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(err) {
				return;
			}

			let url = `${SERVER_ADDRESS}/toLogin?userid=${values.userid}
					&password=${md5(values.password)}`;

			fetch(url).then((res) => {
				if(res.status !== 200) {
					throw new Error('Login Failed, Status:' + res.status);
				}
				res.json().then((data) => {
					if(data.status == 0) {
						this.setState({error: data.message});
					}
					else {
						localStorage.user = 1;
						this.context.router.push("/home");
					}
				}).catch((error) => {
					console.log(error);
				})
			}).catch((error) => {
				console.log(error);
			});
		});
	}
		
	render() {
		const FormItem = Form.Item;
		const {getFieldDecorator} = this.props.form;

		return (
			<div className="login-wrap">
				<p className="login-head">
					管理端登录
				</p>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						{
							getFieldDecorator('userid', {
								rules: [
									{
										required: true,
										message: 'Please input your username!'
									}
								]
							})(
								<Input
									prefix={<Icon type = "user"/>}
									placeholder="userid"/>
							)
						}
					</FormItem>
					<FormItem>
						{
							getFieldDecorator('password', {
								rules: [
									{
										required: true,
										message: 'Please input your Password!'
									}
								]
							})(
								<Input
									prefix={<Icon type = "lock"/>}
									type="password"
									placeholder="Password"/>
							)
						}
					</FormItem>
					<FormItem>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
					</FormItem>
				</Form>
			</div>

		);
	}
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;