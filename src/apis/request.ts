import {client} from './config';

export const test = ()=>{
    return client.get('/api/mock')
}

export const getTodos = ()=>{
    return client.get('/api/todos')
}
