import React, {Component} from 'react';

import {Link} from 'react-router';

import './index.scss';

class ListCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    componentDidMount() {
        setInterval( () =>
            this.setState({
                index: (this.state.index + 1) % this.props.links.length
            })
        , 5000)
    }

    render() {
        const {title = "文章列表", links} = this.props;
        return (
            <div className="list-head-carousel-wrap">
               { // <div className="list-head-carousel-title">
                //     {title}: 
                // </div>
                }
                <div className="list-head-carousel">
                    {
                        links.map((link, index) => (
                            <p style={index === this.state.index ? {opacity: 1} : null } key={index}>
                                <Link to={link.link}>{link.value}</Link>
                            </p>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default ListCarousel;