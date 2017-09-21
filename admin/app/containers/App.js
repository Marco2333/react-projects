import React from 'react';

import NavTop from '../components/nav-top';
import NavSide from '../components/nav-side';

import '../common/common.scss';

export default({children}) => {
    return (
        <div className="wrapper">
            <NavTop/>
            <NavSide/>
            <div className="content">
                <div className="main-content">
                    {children}
                </div>
            </div>
        </div>
    )
}