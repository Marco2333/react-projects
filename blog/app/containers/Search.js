import React from 'react';

import Articles, {stateKey, reducer as articleReducer, initialState as articleState} from '../components/articles';

const Search = () => (
	<Articles />
)

const reducer = {
    [stateKey]: articleReducer
}

const initialState = {
    [stateKey]: articleState
}

export {
    Search, reducer, stateKey, initialState
}