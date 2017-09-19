import React from 'react';

import ArticleDeatil from '../components/article-detail';

const ArticleUpdate = (props) => {
	return (
		<ArticleDeatil id={props.params.id}/>
	)
}

export {
	ArticleUpdate
};