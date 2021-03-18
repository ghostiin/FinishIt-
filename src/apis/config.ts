import axios from 'axios';

//TODO 暂时使用NEI在线mock地址
export const BASE_URL = 'https://nei.netease.com/api/apimock-v2/c98ca1d61bcdd266742a28ec7ccf8e45'

const client =axios.create({
    baseURL: BASE_URL
})

//TODO 封装axios，同一错误处理
client.interceptors.response.use(
    res=>res.data,
    err=>{
        console.log(err,'network err')
    }
)

export {
    client
}