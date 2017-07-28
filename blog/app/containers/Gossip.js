import Gossip, {stateKey, reducer as gReducer, initialState as giState} from '../components/gossip';

const reducer = {
    [stateKey]: gReducer
}

const initialState = {
    [stateKey]: giState
}

export {
    Gossip, reducer, stateKey, initialState
}