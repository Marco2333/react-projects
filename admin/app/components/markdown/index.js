import marked from 'marked';
import {Row, Col} from 'antd';
import React, {Component} from 'react';

import ContentEditable from '../contenteditable';

import './index.scss';

class Markdown extends Component {
	componentDidMount() {
		marked.setOptions({
			highlight: function (code) {
				return require('highlight.js').highlightAuto(code).value;
			}
		});

		if(this.props.preview) {
			this.ele.innerHTML = marked(this.props.content);
		}

		window.addEventListener("beforeunload", this.handleWindowClose);
	}

	handleChange = (content) => {
		this.props.onChange(content);

		if(window.localStorage) {
			localStorage.markdown_content = content;
		}

		if(this.props.preview) {
			this.ele.innerHTML = marked(content);
		}
	}

	componentDidUpdate() {
		if(this.props.preview) {
			this.ele.innerHTML = marked(this.props.content);
		}
	}

	handleWindowClose = (event) => {
		var confirmationMessage = "\o/";
		(event || window.event).returnValue = confirmationMessage;

		return confirmationMessage;
	}

	componentWillUnmount = () => {
		window.removeEventListener("beforeunload", this.handleWindowClose)
	}

	render() {
		let preview = this.props.preview;

		return (
			<div className="markdown-wrap">
				<Row gutter={16}>
					<Col xs={preview ? 13 : 24}>
						<ContentEditable handleChange={this.handleChange} content={this.props.content} />
					</Col>
					<Col xs={preview ? 11 : 0}>
						<div className="markdown-preview" ref={(ele) => {this.ele = ele}}></div>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Markdown;