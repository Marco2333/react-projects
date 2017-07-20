import React from 'react';

import ArticalItem from '../artical-item';

const ArticalList = ({articals}) => {
    return (
        <div className="artical-list">
            {
                articals ? articals.map(artical => {
                    return (
                        <div key={artical.id}>
                            <ArticalItem {...artical}/>
                        </div>
                    )
                }) : ''
            }
        </div>
    )
}

export default ArticalList;