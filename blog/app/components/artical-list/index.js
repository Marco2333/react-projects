import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getArticalList} from './actions';
import ArticalItem from '../artical-item';

class ArticalList extends Component {
    componentDidMount() {
		const {current, count} = this.props;
		this.props.getArticalList(current, count);
    }
    
    render() {
        const {articalList} = this.props;
        return (
            <div className="artical-list">
                {
                    articalList ? articalList.map(artical => {
                        return (
                            <div key={artical.id}>
                                <ArticalItem {...artical}/>
                            </div>
                        )
                    }) : ''
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articalList: state.articals
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticalList: (current, count, type) => {
            dispatch(getArticalList(current, count, type))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticalList);
