import React from 'react';

import GD from '../components/gossip-detail';

const GossipDetail = (props) => {
	return (
		<GD id={props.params.id}/>
	)
}

export {
	GossipDetail
}