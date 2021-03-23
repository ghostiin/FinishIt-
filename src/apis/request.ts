import { IUser } from './../constants';
import {client} from './config';

export const loginOrCreateUser = (data: IUser)=>{
    return client.post('/api/users/login',data);
}

export const logoutUser =()=>{
    return client.post('/api/users/logout')
}
export const getUserProfile=()=>{
    return client.get('/api/users/self');
}

export const getTodos =()=>{
    return client.get('./api/todos');
}