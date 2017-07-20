import React, {Component}  from 'react';
import {connect} from 'react-redux';

import ArticalList from '../../../components/artical-list';
import ListCarousel from '../../../components/list-carousel';

import {getArticalList} from './actions';

export const stateKey = "home-articals";
export const initialState = [];

class Articals extends Component {
    componentDidMount() {
		const {current = 1, count = 10, type = 1} = this.props;
		this.props.getArticalList(current, count, type);
    }
    // componentWillReceiveProps(nextProps){
    //     console.log("Will Receive Props");
    //     // const {current = 1, count = 10, type = 1} = this.props;
	// 	// this.props.getArticalList(current, count, type);
    // }

    // shouldComponentUpdate() {
    //     console.log("should update");
    //     return true;
    // }

    // componentWillUpdate() {
    //     console.log("will update");
    // }

    // componentDidUpdate() {
    //     console.log("Did update");
    // }

    // componentWillUnmount() {
    //     console.log("will unmount");
    // }

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
                
                <ArticalList articals={articalList}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Articals);