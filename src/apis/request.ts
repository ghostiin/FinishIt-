import { IUser, ITodo } from './../constants';
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
    return client.get('/api/todos');
}

export const createTodo =(data:ITodo)=>{
    return client.post('/api/todos',data);
}

export const completeTodo = (id:string,status:boolean)=>{
    return client.patch(`/api/todos/${id}`,{
        completed: status
    });
}

export const updateTodo = (data:ITodo)=>{
    return client.patch(`/api/todos/${data._id}`,data)
}

export const deleteTodo  =(id:string)=>{
    return client.delete(`/api/todos/${id}`)
}