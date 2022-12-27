import req from './req'

// 登陆接口
export const login = (data) => req({ method: 'POST', url: '/user/login', data })

// 注册接口
export const register = (data) => req({ method: 'PUT', url: '/user/register', data })