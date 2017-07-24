import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getArticalDetail} from './actions';

import './index.scss';

export const stateKey = 'artical-detail';
export const initialState = { };

class ArticalDetail extends Component {

    componentDidMount() {
        let {id, getDetail} = this.props; 
        console.log('hh');
        getDetail(id);
    }

    componentWillReceiveProps(nextProps) {
        let {id, getDetail} = this.props;

        if (id != nextProps.id) {
            console.log(123);
            getDetail(nextProps.id);
        }
    }

    render() {
        const {title, body, tag, category, created_at, updated_at, views, type} = this.props.detail;
        return (
            <div className="artical-detail">
                <h3 className="blog-title">
                    {
                        type == 2 ? "[转]"
                        : type == 3 ? "[译]" : ""
                    }
                    {title}
                </h3>
                <div className="blog-top">
                    <span>
                        Last Modified : &nbsp; 
                        {
                            updated_at ? updated_at : created_at
                        }
                    </span>
                    <span className="spliter"></span>
                    <span>浏览 : &nbsp;  {views}</span><span className="spliter"></span>
                    <span>标签 : &nbsp;  {tag}</span>
                </div>
                <div className="blog-content" dangerouslySetInnerHTML={{__html: body}}></div>
                <script src=""></script>                  
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state[stateKey] && state[stateKey].id || null,
        detail: state[stateKey] || {}
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        getDetail: (id) => {
            dispatch(getArticalDetail(id))
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(ArticalDetail);