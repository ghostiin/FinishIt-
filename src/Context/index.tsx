import dayjs from 'dayjs';
import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IContextProps {
	todos: any;
	// dispatch: ({type}:{type:string}) => void;
	dispatch: any;
}


const genMockTodos = () => {
	const m = [14, 15, 16, 17, 18, 19, 20];
	const mocks: { name: string; id: string; scheduleTime: dayjs.Dayjs; completed: boolean; flag: boolean; createTime: string; }[] = [];
	function g() {
		m.forEach((d) => {
			const id = uuidv4();
			const m = {
				name: `${d}-${id}`,
				id: id,
				scheduleTime: Math.random() > 0.75 ? dayjs().add(Math.floor(Math.random() * (7 + 1)), 'day') : null,
				completed: Math.random() > 0.5 ? true : false,
				flag: false,
				createTime: `2021-03-${d}T21:06:13+08:00`,
			}
			mocks.push(m);
		})
	}

	for (let i = 0; i < 4; i++) {
		g();
	}
	console.log(mocks);
	return mocks;

}

const initialTodos = JSON.parse(localStorage.getItem('todos'));
// const initialTodos = genMockTodos();

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
