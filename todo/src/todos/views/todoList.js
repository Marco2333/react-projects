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


const TodoList = ({
	todos
}) => {
	return (
		<ul>
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