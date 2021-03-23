import { message } from './../UI/message';
import axios from 'axios';

//TODO 暂时使用NEI在线mock地址
// export const BASE_URL = 'https://nei.netease.com/api/apimock-v2/c98ca1d61bcdd266742a28ec7ccf8e45'
// vps上自建后端
export const BASE_URL = 'http://116.62.146.32:8001';

const client =axios.create({
    baseURL: BASE_URL
})

client.interceptors.request.use(
    config=>{
        if (localStorage.getItem('token')) { //统一带token请求
            config.headers.Authorization = localStorage.getItem('token');  
          }
        return config
    },
    err=>{
        console.log(err)

    }
)

//TODO 封装axios，同一错误处理
client.interceptors.response.use(
    res=>{
        return res.data;
    },
    err=>{
        if(!err) {
            Promise.reject(err)
        }
        const {response } =err;
        message.error(response.data.message);
    }
)

export {
    client
}