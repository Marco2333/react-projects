import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Timeline, Pagination, Icon, Row, Col} from 'antd';

import {getGossip} from './actions';

import "./index.scss";

export const stateKey = 'gossip';

class Gossip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            count: 30
        }

        this.onPageChange = this.onPageChange.bind(this);
    }

    componentDidMount() {
        let {current, count} = this.state;
        this.props.getGossip(current, count);
    }

    onPageChange(page, count) {
        this.setState({
            current: page,
            count: count
        });

        this.props.getGossip(page, count);
    }

    render() {
        const {gossips, total, pagination = true} = this.props;
        let {count, current} = this.state;

        return (
            <div className="gossip-wrap">
                <div className="gossip-body">
                    <Timeline>
                        {
                            gossips && gossips.map((item, index) => (
								<Timeline.Item key={item.id}>
									<div className="gossip-item wow fadeInLeft animated">
										{
											item.img 
											?
											<Row gutter={16}>
												<Col xs={24} sm={9}>
													<div className="gossip-img">
														<img src={item.img} alt=""/>
													</div>
												</Col>
												<Col xs={24} sm={15}>
													<div className="gossip-detail">
														{item.detail}
													</div>
												</Col>
											</Row>
											:
											<div className="gossip-detail">
												{item.detail}
											</div>
										}
										<p className="gossip-author">posted@ {item.created_at} </p>
									</div>
								</Timeline.Item>
                            ))
                        }
                    </Timeline>
                </div>
                {
                    pagination && total ?
                    <div className="pagination">
                        <Pagination defaultCurrent={1} pageSize={count} current={current} 
                        total={total} onChange={this.onPageChange}/> 
                    </div>
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        gossips: state[stateKey]["gossips"],
        total: state[stateKey]["total"],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGossip: (current, count) => {
            dispatch(getGossip(current, count))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gossip);