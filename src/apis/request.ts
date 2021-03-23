import {client} from './config';

export const createUser = ()=>{
    return client.get('/api/users');
}
