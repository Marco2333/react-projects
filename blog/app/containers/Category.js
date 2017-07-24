import Category, {stateKey, reducer as cReducer, initialState as ciState} from '../components/category';

const reducer = {
    [stateKey]: cReducer
}

const initialState = {
    [stateKey]: ciState
}

export {
    Category, reducer, stateKey, initialState
}