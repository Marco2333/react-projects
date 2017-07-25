import ArticalDetail, {stateKey, reducer as adReducer, initialState as adiState} from '../components/artical-detail';

const reducer = {
    [stateKey]: adReducer
}

const initialState = {
    [stateKey]: adiState
}

export {
    ArticalDetail, reducer, stateKey, initialState
}