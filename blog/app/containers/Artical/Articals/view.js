import React, {Component}  from 'react';
import {connect} from 'react-redux';

import { Pagination } from 'antd';

import ArticalList from '../../../components/artical-list';

import {getArticalList} from './actions';

export const stateKey = "artical-articals";
export const initialState = [];

class Articals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            count: 10
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const {type = 0} = this.props;
        let {current, count} = this.state;

		this.props.getArticalList(current, count, type);
    }

    onChange(page, count) {
        this.setState({
            ...this.state,
            current: page,
            count: count
        });

        const {type = 0} = this.props;
        this.props.getArticalList(page, count, type);
    }
    
    render() {
        let {articalList, total, pagination = true} = this.props;
        let {count, current} = this.state;
        
        return (
            <div>
                <ArticalList articals={articalList}/>
                {
                    pagination && total ?
                    <div className="pagination">
                        <Pagination defaultCurrent={1} pageSize={count} current={current} total={total} 
                        onChange={this.onChange} onShowSizeChange={this.onChange} showSizeChanger /> 
                    </div>
                    : null
                }
            </div>
             
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articalList: state[stateKey] && state[stateKey].articals || null,
        total: state[stateKey] && state[stateKey].total || null
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