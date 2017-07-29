import React from 'react';

import ArticleItem from '../article-item';

const ArticleList = ({articles}) => {
    return (
        <div className="article-list">
            {
                articles ? articles.map(article => {
                    return (
                        <div key={article.id}>
                            <ArticleItem {...article}/>
                        </div>
                    )
                }) : ''
            }
        </div>
    )
}

export default ArticleList;