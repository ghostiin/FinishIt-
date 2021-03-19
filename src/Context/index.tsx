import React, { useReducer } from 'react';

interface IContextProps {
	todos: any;
	// dispatch: ({type}:{type:string}) => void;
	dispatch: any;
}

const initialTodos = JSON.parse(localStorage.getItem('todos'))
	|| [{
		name: '样例todo1',
		id: 1,
		completed: false,
		createTime: '2021-03-18T21:06:13+08:00',
		flag: false,
		scheduleTime: null
	},
	{
		name: 'past todo2',
		id: 2,
		completed: false,
		createTime: '2021-02-18T21:06:13+08:00',
		flag: false,
		scheduleTime: null
	}
	];

export const TodosContext = React.createContext({} as IContextProps);

export const ADD_TODO = 'add_todo';
export const DELETE_TODO = 'delete_todo';
export const TOGGLE_TODO = 'toggle_todo';
export const MODIFY_TODO = 'modify_todo';

export const DONE_TODO = 'done_todo';
export const UNDO_TODO = 'undo_todo';

const todosReducer = (state: Array<any>, action: { type: string, payload: any }) => {
	switch (action.type) {
		case ADD_TODO:
			return [...state, action.payload];
		case TOGGLE_TODO:
			return state.map(t => {
				if (t.id === action.payload) {
					t.completed = !t.completed
				}
				return t;
			});
		case MODIFY_TODO:
			return state.map(t => {
				if (t.id === action.payload.id) {
					t = { ...t, ...action.payload.modifyContent }
				}
				return t;
			})
		case DELETE_TODO:
			console.log(action.payload)
			return state.filter(t => t.id !== action.payload)
		default:
			return state;
	}
};

export const TodosProvider = (props: { children: any }) => {
	const [todos, dispatch] = useReducer(todosReducer, initialTodos);

	return <TodosContext.Provider value={ { todos, dispatch } }>{ props.children }</TodosContext.Provider>;
};
