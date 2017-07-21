import React, {Component} from 'react';


import ArticalList, {initialState as articalsIS, reducer as articalsReducer, stateKey as articalsSK} from './Articals';

class Home extends Component {
    render() {
        return (
            <div>
                <ArticalList current={1} count={15} type={1} carousel={true}/>
            </div>
        )
    }
}

const initialState = {
    [articalsSK]: articalsIS
};

const reducer = {
    [articalsSK]: articalsReducer
}

export {reducer, initialState, Home};