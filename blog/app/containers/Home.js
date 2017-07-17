import React, {Component} from 'react';

import NavTop from '../components/nav-top-home';
import Banner from '../components/banner';
import ArticalList from '../components/artical-list';


class Home extends Component {
    render() {
        return (
            <div>
                <NavTop/>
                <Banner/>
                <div>
                    <ArticalList current={1} count={10} type={1} />
                </div>
            </div>
        )
    }
}

export default Home;