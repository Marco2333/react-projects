import TimeLine, {stateKey, reducer as tlReducer, initialState as tlState} from '../components/timeline';

const reducer = {
    [stateKey]: tlReducer
}

const initialState = {
    [stateKey]: tlState
}

export {
    TimeLine, reducer, stateKey, initialState
}