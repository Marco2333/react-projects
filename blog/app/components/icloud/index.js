import React from 'react';
import {Link} from 'react-router';

import {strLen} from '../../common/str';

import './index.scss';

export default ({tags}) => {
	if(!tags || !tags.length) {
		return null;
	}

	const colors = ["#f50", "#f8a72a", "#87d068", "#108ee9", "#c761f0"];

	// let total = 0, average = 0, len = tags.length;
	// for(let i = 0;i < len;i++) {
	// 	total += strLen(tags[i]);
	// }
	// average = total / len;

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
						<span className="icloud-item" style={{backgroundColor: colors[Math.floor(5 * Math.random())]}}>{tag}</span>
					</Link>
				))
			}
		</div>
	)
}