import React from 'react';
import {
	view as Todos
} from './todos/';
import {
	view as filter
} from './filter/';

function TodoApp() {
	return (
		<div>
			<Todos />
			<Filter />
		</div>
	);
}