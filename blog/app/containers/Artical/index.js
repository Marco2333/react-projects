import React from 'react';

import {Row, Col} from 'antd';

import ArticalList, {reducer as articalsReducer, stateKey as articalsSK, initialState as articalsIS} from './Articals';

const Artical = () => {
    return (
        <div>
            <ArticalList current={1} count={15} type={1} />
        </div>
    )
}


const initialState = {
    [articalsSK]: articalsIS
};

const reducer = {
    [articalsSK]: articalsReducer
}

export {Artical, initialState, reducer};