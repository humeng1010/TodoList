import req from './req'

const uploadAllTodo = (data) => req({ method: 'POST', url: '/saves', data })