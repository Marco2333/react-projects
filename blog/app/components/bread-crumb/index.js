import React from 'react';
import {Breadcrumb} from 'antd';

import './index.scss';

export default (props) => {
	return (
		<div className="bread-crumb">
			<span className="fl">当前位置 : &nbsp; &nbsp;</span> 
			<div className="fl">
				<Breadcrumb {...props}/>
			</div>
		</div>
	)
}