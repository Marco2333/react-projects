import React, {Component} from 'react';

import {Carousel} from 'antd';

import "./style.scss";

import bannerImg from "../../../public/image/banner.jpg";

class Banner extends Component {
    render() {
        return (
            <Carousel autoplaySpeed={5000} autoplay>
                <div>
                    <img src={bannerImg} alt=""/>
                </div>
                <div>
                    <img src={bannerImg} alt=""/>
                </div>
                <div>
                    <img src={bannerImg} alt=""/>
                </div>
                <div>
                    <img src={bannerImg} alt=""/>
                </div>
            </Carousel>
        )
    }
}

export default Banner;