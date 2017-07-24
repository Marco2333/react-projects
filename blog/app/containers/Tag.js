import Tag, {stateKey, reducer as tReducer, initialState as tiState} from '../components/tag';

const reducer = {
    [stateKey]: tReducer
}

const initialState = {
    [stateKey]: tiState
}

export {
    Tag, reducer, stateKey, initialState
}