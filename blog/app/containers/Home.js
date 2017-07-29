import React from 'react';

import Articles, {stateKey, reducer as articleReducer, initialState as articleState} from '../components/articles';

const Home = () => (
	<Articles carousel={true} pagination={false} type={1} />
)

const reducer = {
    [stateKey]: articleReducer
}

const initialState = {
    [stateKey]: articleState
}

export {
    Home, stateKey, reducer, initialState
}