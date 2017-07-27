import Gather, {stateKey, reducer as nlReducer, initialState as nliState} from '../components/note-list';

const reducer = {
    [stateKey]: nlReducer
}

const initialState = {
    [stateKey]: nliState
}

export {
    Gather, reducer, stateKey, initialState
}