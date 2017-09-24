import React from 'react';
import {Link} from 'react-router';

import {strLen} from '../../common/string';

import './index.scss';

export default ({tags}) => {
	if(!tags || !tags.length) {
		return null;
	}

	const colors = ["#f50", "#f8a72a", "#87d068", "#108ee9", "#6b61f0"];

	tags = tags.sort((str1, str2) => (
		strLen(str1) - strLen(str2)
	));

	let res = [];
	while(tags.length > 0) {
		res.push(tags.pop());

		if(tags.length == 0) {
			break;
		}
		                                                                                                      
		res.push(tags.shift());
	}


	return (
		<div className="icloud-wrap">
			{
				res && res.map((tag, index) => (
					<Link key={tag} to={`/tag/${tag}`}>
						<span className="icloud-item" style={{backgroundColor: colors[index % 5]}}>{tag}</span>
					</Link>
				))
			}
		</div>
	)
}