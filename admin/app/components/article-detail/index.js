import React, {Component} from 'react';

import {Editor} from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class ArticleDeatil extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div style={{height: "300px"}}>
				<Editor style={{height: "300px"}}></Editor>
			</div>
		)
	}

}

export {
	ArticleDeatil
};