import React, {Component}  from 'react';
import {connect} from 'react-redux';

import { Pagination } from 'antd';

import ArticleList from '../../components/article-list';

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
        let {articleList, total, pagination = true} = this.props;
        let {count, current} = this.state;
        
        return (
            <div>
                <ArticleList articles={articleList}/>
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
        articleList: state[stateKey] && state[stateKey].articles || null,
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