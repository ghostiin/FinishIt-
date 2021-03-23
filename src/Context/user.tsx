import { AxiosResponse } from 'axios';
import React, { useEffect, useReducer } from 'react';
import { getUserProfile, loginOrCreateUser } from '../apis/request';
import { IUser } from '../constants';

interface IContextProps {
	user: IUser;
	// dispatch: ({type}:{type:string}) => void;
	dispatch: any;
}

export const UserContext = React.createContext({} as IContextProps);

export const LOGIN_USER = 'login_user';
export const LOGOUT_USER = 'logout_user';

const userReducer = (state: IUser, action: { type: string, payload?: any }) => {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, ...action.payload };
		case LOGOUT_USER:
			return null;
		default:
			return state;
	}
}




export const UserProvider = (props: { children: React.ReactNode }) => {
	const [user, dispatch] = useReducer(userReducer, null)
	const fetchOriginal = async () => {
		if (localStorage.getItem('token')) {
			const resp: any = await getUserProfile();
			const { name, email, _id } = resp;
			dispatch({ type: LOGIN_USER, payload: { name, email, _id } })
		}
	}

	useEffect(() => {
		fetchOriginal()
	}, [])

	return <UserContext.Provider value={ { user, dispatch } }>{ props.children }</UserContext.Provider>;
};
