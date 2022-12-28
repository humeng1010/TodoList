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

/**
 * 新增todo
 * @param {string} data 
 * @returns 
 */
export const addTodos = (data) => req({ method: 'POST', url: '/todos/add', data })

/**
 * 根据手机号获取todos
 * @param {string} phone 
 * @returns 
 */
export const getTodosByPhone = (phone) => req({ method: 'GET', url: `/todos/${phone}` })

/**
 * 根据id更新事项完成状态
 * @param {object} data 
 * @returns 
 */
export const updateDoneById = (data) => req({ method: 'PUT', url: '/todos/update', data })

/**
 * 根据id删除事项
 * @param {number} id 
 * @returns 
 */
export const deleteById = (id) => req({ method: 'DELETE', url: '/todos/delete', data: id })