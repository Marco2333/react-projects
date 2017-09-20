import React from 'react';

import GatherDetail from '../components/gather-detail';

const GatherUpdate = (props) => {
	return (
		<GatherDetail id={props.params.id}/>
	)
}

export {
	GatherUpdate
};