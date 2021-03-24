import dayjs from 'dayjs';
import React, { useContext, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getTodos } from '../apis/request';
import { ITodo } from '../constants';
import { UserContext } from './user';

interface IContextProps {
	todos: ITodo[];
	dispatch: any;
}


// const genMockTodos = () => {
// 	const m = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
// 	const mocks: ITodo[] = [];
// 	function g() {
// 		m.forEach((d) => {
// 			const id = uuidv4();
// 			const m: ITodo = {
// 				name: `${d}-${id}`,
// 				_id: id,
// 				scheduleTime: Math.random() > 0.75 ? dayjs().add(Math.floor(Math.random() * (7 + 1)), 'day').format() : `2021-03-${d}T21:06:13+08:00`,
// 				completed: Math.random() > 0.5 ? true : false,
// 				flag: false,
// 				createdAt: `2021-03-${d}T10:12:07.653Z`,
// 			}
// 			mocks.push(m);
// 		})
// 	}

// 	for (let i = 0; i < 4; i++) {
// 		g();
// 	}
// 	console.log(mocks);
// 	return mocks;

// }

// const initialTodos = JSON.parse(localStorage.getItem('todos'));
// const initialTodos = genMockTodos();

export const TodosContext = React.createContext({} as IContextProps);

export const SET_TODOS = 'set_todos';
export const ADD_TODO = 'add_todo';
export const DELETE_TODO = 'delete_todo';
export const TOGGLE_TODO = 'toggle_todo';
export const MODIFY_TODO = 'modify_todo';

export const DONE_TODO = 'done_todo';
export const UNDO_TODO = 'undo_todo';

const todosReducer = (state: Array<ITodo>, action: { type: string, payload: any }) => {
	switch (action.type) {
		case SET_TODOS:
			return [...action.payload];
		case ADD_TODO:
			return [...state, action.payload];
		case TOGGLE_TODO:
			return state.map(t => {
				if (t._id === action.payload) {
					t.completed = !t.completed
				}
				return t;
			});
		case MODIFY_TODO:
			return state.map(t => {
				if (t._id === action.payload._id) {
					t = { ...t, ...action.payload }
				}
				return t;
			})
		case DELETE_TODO:
			console.log(action.payload)
			return state.filter(t => t._id !== action.payload)
		default:
			return state;
	}
};

export const TodosProvider = (props: { children: React.ReactNode }) => {
	const [todos, dispatch] = useReducer(todosReducer, []);
	const { user } = useContext(UserContext);
	const fetchOriginalTodos = async () => {
		if (user) {
			const resp: any = await getTodos();
			dispatch({ type: SET_TODOS, payload: resp })
		}
	}

	useEffect(() => {
		if (user && Object.keys(user).length) {
			fetchOriginalTodos()
		} else {
			dispatch({ type: SET_TODOS, payload: [] })
		}
	}, [user])

	return <TodosContext.Provider value={ { todos, dispatch } }>{ props.children }</TodosContext.Provider>;
};
