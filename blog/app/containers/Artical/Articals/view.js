import React, {Component}  from 'react';
import {connect} from 'react-redux';

import ArticalList from '../../../components/artical-list';

import {getArticalList} from './actions';

export const stateKey = "artical-articals";
export const initialState = [];

class Articals extends Component {
    componentDidMount() {
		const {current = 1, count = 10, type = 0} = this.props;
		this.props.getArticalList(current, count, type);
    }
    
    render() {
        const {articalList} = this.props;
    
        return (
            <div>
                <ArticalList articals={articalList}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articalList: state[stateKey] && state[stateKey].articals || null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticalList: (current, count, type) => {
            dispatch(getArticalList(current, count, type))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articals);