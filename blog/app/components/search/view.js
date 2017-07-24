import React, {Component}  from 'react';
import {connect} from 'react-redux';

import { Pagination } from 'antd';

import ArticalList from '../../components/artical-list';

import {search} from './actions';

export const stateKey = "search";
export const initialState = [];

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            count: 15
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const {keyword} = this.props;
        let {current, count} = this.state;

		this.props.search(current, count, keyword);
    }

    componentWillReceiveProps(nextProps) {
        const {keyword} = this.props;
        let {current, count} = this.state;

        if(keyword !== nextProps.keyword) {
            this.props.search(current, count, nextProps.keyword);
        }
    }
    
    onChange(page, count) {
        this.setState({
            current: page,
            count: count
        });

        const {keyword} = this.props;
        this.props.search(page, count, keyword);
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
                        onChange={this.onChange} /> 
                    </div>
                    : null
                }
            </div>
             
        )
    }
}

const mapStateToProps = (state) => {
    return {
        keyword: state[stateKey] && state[stateKey].keyword || '',
        articalList: state[stateKey] && state[stateKey].articals || null,
        total: state[stateKey] && state[stateKey].total || null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        search: (current, count, keyword) => {
            dispatch(search(current, count, keyword))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);