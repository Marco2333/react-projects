import Search, {stateKey, reducer as sReducer, initialState as siState} from '../components/search';

const reducer = {
    [stateKey]: sReducer
}

const initialState = {
    [stateKey]: siState
}

export {
    Search, reducer, stateKey, initialState
}