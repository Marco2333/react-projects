import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getArticalList} from './actions';
import ArticalItem from '../artical-item';
import ListCarousel from '../list-carousel';

export const stateKey = "indexArticals";

class ArticalList extends Component {
    componentDidMount() {
		const {current, count} = this.props;
		this.props.getArticalList(current, count);
    }
    
    render() {
        const {articalList, carousel} = this.props;
    
        return (
            <div>
                { articalList && carousel 
                    ? <ListCarousel links={
                        articalList.map(artical => {
                            return {
                                link: `/artical-detail/${artical.id}`,
                                value: `${artical.title}`
                            } 
                      })} /> : null 
                }
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articalList: state[stateKey].articals || null
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
