import React, {Component} from 'react';
import {Modal} from 'antd';

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
        const {title, created_at, detail, tag} = this.props;
        return (
            <div className="note-wrap" onClick={this.showDetail}>
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

export default Note;