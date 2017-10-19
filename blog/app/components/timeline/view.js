import {Link} from 'react-router';
import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import {Select, Timeline, Pagination, Icon} from 'antd';

import {getTimeline} from './actions';

import "./index.scss";

export const stateKey = 'timeline';

class TimeLine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: '0',
			current: 1,
			count: 30
		}

		this.onChange = this.onChange.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
	}

	componentDidMount() {
		let {current, category, count} = this.state;
		this.props.getTimeline(current, count, category);
	}

	onChange(value) {
		this.setState({
			category: value,
			current: 1
		});

		let {current, count} = this.state;
		this.props.getTimeline(current, count, value);
	}

	onPageChange(page, count) {
		this.setState({
			current: page,
			count: count
		});

		let {category} = this.state;
		this.props.getTimeline(page, count, category);
	}

	render() {
		let tlItems = [], Item = Timeline.Item;
		const Option = Select.Option;
		let {count, current, category} = this.state;
		const {items, categories, total, pagination = true} = this.props;
		
		categories[0] && categories[0].id != 0 ? categories.unshift({id: 0, theme: "全部"}) : "";

		items.forEach((item, index, arr) => {
			let colorArr = ['blue', 'red', 'green'];
			let timeStr = item.created_at.substring(0, item.created_at.lastIndexOf("-"));
				
			if (index === 0 || timeStr != arr[index - 1].created_at.substring(0, arr[index - 1].created_at.lastIndexOf("-"))) {
				tlItems.push({
					type: 'time',
					key: timeStr
				});
				tlItems.push({
				   type: 'item',
				   id: item.id,
				   color: colorArr[index % 3],
				   title: item.title
				})
			}
			else {
				tlItems.push({
				type: 'item',
				   id: item.id,
				   color: colorArr[index % 3],
				   title: item.title
				})
			}
		})

		return (
			<div className="timeline-wrap">
				<div className="timeline-select">
					<Select style={{ width: 200}} defaultValue="全部"  onChange={this.onChange}>
						{
							categories.map((item) => (
								<Option value={item.id + ""} key={item.id}>{item.theme}</Option>
							))
						}
					</Select>
				</div>
				<div className="timeline-body">
					<Timeline>
						{
							tlItems.map((item) => (
								item.type === 'time' 
								?
									<Item key={item.key} color="blue"
										dot={<Icon type="clock-circle-o" style={{ fontSize: '16px'}} />}>
										<p className="timeline-time wow zoomIn animated">{item.key}</p>
									</Item>
								:
									<Item key={item.id} color={item.color}>
										<Link to={`article-detail/${item.id}`}>
											<p className="timeline-item wow zoomIn animated">{item.title}</p>
										</Link>
									</Item>
							))
						}
					</Timeline>
				</div>
				{
					pagination && total ?
					<div className="pagination" style={{marginTop: 0}}>
						<Pagination defaultCurrent={1} pageSize={count} current={current} 
						total={total} onChange={this.onPageChange}/> 
					</div>
					: null
				}
			</div>
		)
	}
}

TimeLine.propTypes = {
	items: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired,
	getTimeline: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		items: state[stateKey] && state[stateKey]["items"] || [],
		categories: state[stateKey] && state[stateKey]["categories"] || [],
		total: state[stateKey] && state[stateKey]["total"],
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getTimeline: (current, count, category) => {
			dispatch(getTimeline(current, count, category))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);