import ReactDOM from 'react-dom';
import React, {Component} from 'react';

import './index.scss';

class ContentEditable extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.content !== ReactDOM.findDOMNode(this).innerText;
	}

	emitChange = () => {
		let content = ReactDOM.findDOMNode(this).innerText;

		if(this.props.handleChange && content !== this.lastContent) {
			this.props.handleChange(content);
			this.lastContent = content;
		}
	}

	render() {
		let content = this.props.content ? this.props.content : '';

		content = content.replace(/[<>&"]/g, function(c) {
			return {
				'<': '&lt;',
				'>': '&gt;',
				'&': '&amp;',
				'"': '&quot;'
			}[c];
		});

		return (
			<div className="content-editable"
				onInput={this.emitChange}
				onBlur={this.emitChange}
				contentEditable = "true"
				dangerouslySetInnerHTML={{__html: content}}>
			</div>
		)
	}
}

export default ContentEditable;