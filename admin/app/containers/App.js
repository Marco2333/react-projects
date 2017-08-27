import React from 'react';

import NavSide from '../components/nav-side';
import NavTop from '../components/nav-top';

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