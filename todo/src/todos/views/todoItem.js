import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'react-redux';
import {
	toggleTodo,
	removeTodo
} from '../actions.js';

const TodoItem = ({
	onToggle,
	onRemove,
	completed,
	text
}) => {
	return (
		<li className="todo-item" style = {{textDecoration: completed ? 'line-through' : 'none'}}>
			<input type="checkbox" className="toggle" checked = {completed ? "checked" : ""} onClick={onToggle} readOnly />
			<lable className="text">{text}</lable>
			<button className="remove" onClick={onRemove}>×</button>
		</li>
	);
}

TodoItem.propTypes = {
	onToggle: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	completed: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const {
		id
	} = ownProps;

	return {
		onToggle: () => dispatch(toggleTodo(id)),
		onRemove: () => dispatch(removeTodo(id))
	}
}

export default connect(null, mapDispatchToProps)(TodoItem);