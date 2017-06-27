import React, {
	PropTypes
} from 'react';
import {
	connect
} from 'react-redux';
import TodoItem from './todoItem.js';

import {
	selectVisibleTodos
} from '../selector.js';

import TransitionGroup from 'react-addons-css-transition-group';

import './todoItem.css';

const TodoList = ({
	todos
}) => {
	return (
		<ul>
			<TransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={200} transitionAppear={true} transitionAppearTimeout={500}>
				{
					todos.map((item) => (
						<TodoItem 
							id={item.id} 
							key={item.id} 
							text={item.text} 
							completed={item.completed} 
						/>
					))
				}
			</TransitionGroup>
		</ul>
	)
};


TodoList.PropTypes = {
	todos: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
	return {
		todos: selectVisibleTodos(state)
	};
}

export default connect(mapStateToProps)(TodoList);