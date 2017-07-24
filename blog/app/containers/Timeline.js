import TimeLine, {stateKey, reducer as tlReducer, initialState as tliState} from '../components/timeline';

const reducer = {
    [stateKey]: tlReducer
}

const initialState = {
    [stateKey]: tliState
}

export {
    TimeLine, reducer, stateKey, initialState
}