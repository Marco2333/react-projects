import React, {Component}  from 'react';
import {connect} from 'react-redux';

import { Pagination } from 'antd';

import ArticleList from '../../components/article-list';

import {getCategory} from './actions';

export const stateKey = "category";
export const initialState = {};

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            count: 15
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const {category} = this.props;
        let {current, count} = this.state;

		this.props.getCategory(current, count, category);
    }

    componentWillReceiveProps(nextProps) {
        const {category} = this.props;
        let {current, count} = this.state;

        if(category !== nextProps.category) {
            this.props.getCategory(current, count, nextProps.category);
        }
    }
    
    onChange(page, count) {
        this.setState({
            current: page,
            count: count
        });

        const {category} = this.props;
        this.props.getCategory(page, count, category);
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
        category: state[stateKey] && state[stateKey].category || 0,
        articleList: state[stateKey] && state[stateKey].articles || null,
        total: state[stateKey] && state[stateKey].total || null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: (current, count, category) => {
            dispatch(getCategory(current, count, category))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);