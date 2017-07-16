import React, {Component} from 'react';

import NavTop from '../components/nav-top-home';
import Banner from '../components/banner';


class Home extends Component {
    render() {
        return (
            <div>
                <NavTop/>
                <Banner/>
            </div>
        )
    }
}

export default Home;