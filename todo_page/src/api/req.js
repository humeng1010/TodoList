// 对于axios进行二次封装
import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条的样式
import "nprogress/nprogress.css";

const requests = axios.create({
    baseURL: "/api",
    // 请求超时的时间5s
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    }

})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // 进度条开始
    nprogress.start();
    config.headers.token = sessionStorage.getItem('token')
    return config
})
// 响应拦截器
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done();
    return res.data
}, (error) => {
    // 服务器响应失败的回调函数
    nprogress.done();
    return Promise.reject(error)
})

export default requests