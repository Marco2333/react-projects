import {Link} from 'react-router';
import React, {Component} from 'react';

import './index.scss';

export default () => (
    <footer className="footer">
		<p><Link to='index'>旧主页</Link></p>
		<p><span>Marco © 2016-2017 All rights reserved</span></p>
	</footer>
)
