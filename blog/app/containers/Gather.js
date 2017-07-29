import Gather, {stateKey, reducer as nReducer, initialState as nState} from '../components/note-list';

const reducer = {
    [stateKey]: nReducer
}

const initialState = {
    [stateKey]: nState
}

export {
    Gather, reducer, stateKey, initialState
}