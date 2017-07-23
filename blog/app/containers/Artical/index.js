import React from 'react';

import ArticalList, {reducer as articalsReducer, stateKey as articalsSK, initialState as articalsIS} from './Articals';

const Artical = () => {
    return (
        <ArticalList />
    )
}

const initialState = {
    [articalsSK]: articalsIS
};

const reducer = {
    [articalsSK]: articalsReducer
}

export {Artical, initialState, reducer};