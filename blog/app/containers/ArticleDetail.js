import ArticleDetail, {stateKey, reducer as adReducer, initialState as adiState} from '../components/article-detail';

const reducer = {
    [stateKey]: adReducer
}

const initialState = {
    [stateKey]: adiState
}

export {
    ArticleDetail, reducer, stateKey, initialState
}