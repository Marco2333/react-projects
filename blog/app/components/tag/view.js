import React, {Component}  from 'react';
import {connect} from 'react-redux';

import ArticalList from '../../components/artical-list';

import {getTag} from './actions';

export const stateKey = "tag";
export const initialState = {};

class Tag extends Component {

    componentDidMount() {
        const {tag} = this.props;
        if(tag !== '') {
            this.props.getTag(tag);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {tag} = this.props;

        if(tag !== nextProps.tag) {
            this.props.getTag(nextProps.tag);
        }
    }
    
    render() {
        let {articalList} = this.props;
    
        return (
            <ArticalList articals={articalList} /> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tag: state[stateKey] && state[stateKey].tag || '',
        articalList: state[stateKey] && state[stateKey].articals || null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTag: (tag) => {
            dispatch(getTag(tag))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);