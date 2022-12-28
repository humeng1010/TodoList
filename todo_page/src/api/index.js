import req from './req'
// 登陆接口
export const login = (data) => req({ method: 'POST', url: '/user/login', data })
// 检查用户是否登陆的接口
export const checkLogin = async () => {
    try {
        await req({ method: 'GET', url: '/user' })
        return true
    } catch (error) {
        return false
    }
}
// 检查手机号是否被占用
export const checkPhones = (phone) => req({ method: 'POST', url: '/user/check', data: phone })
// 注册接口
export const register = (data) => req({ method: 'PUT', url: '/user/register', data })
/**
 * 根据手机号获取昵称
 * @param {string} phone 
 * @returns 
 */
export const getNikeByPhone = (phone) => req({ method: 'GET', url: `/user/${phone}` })