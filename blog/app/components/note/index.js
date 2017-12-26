import {Modal} from 'antd';
import React, {Component, PropTypes} from 'react';

import {escape2Html} from '../../common/escape';

import './index.scss';

class Note extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible: false
		}
	}

	showDetail = (event) => {
		this.setState({visible: true});
	}

	handleCancel = (e) => {
		this.setState({visible: false});
	}

	render() {
		const {title, created_at, animate = "zoomIn", detail, tag} = this.props;
		
		return (
			<div className={`note-wrap wow animated ${animate}`} onClick={this.showDetail}>
				<p className="note-title">
					{title}
				</p>
				<p>{created_at}</p>
				<div className="note-abstract">
					{escape2Html(detail).replace(/<\/?[^>]+(>|$)/g, "")}
				</div>
				<p className="note-author">Marco</p>
				<Modal
					title={title}
					visible={this.state.visible}
					footer={null}
					onCancel={this.handleCancel}
					style={{maxWidth: "100%"}}>
					<p className="note-modal-tag">post@: {created_at} &nbsp;&nbsp; 标签: {tag}</p>
					<div className="note-modal-detail" dangerouslySetInnerHTML={{__html: detail}}></div>
				</Modal>
			</div>
		)
	}
}

Note.propTypes = {
	title: PropTypes.string.isRequired,
	detail: PropTypes.string.isRequired
};

export default Note;