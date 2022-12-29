import React, { Component } from 'react'

import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'

import './App.css'
import Nav from './components/Nav'

import { addTodos, checkLogin, deleteById, getTodosByPhone, updateDoneById } from './api'

import PubSub from 'pubsub-js'
import { ISLOGGEDIN } from './pubsubConstant'

export default class App extends Component {
    // 初始化状态
    state = {
        todos: [],
        isLogin: false,
        preTodos: [],
    }
    // 获取todos
    getTodos = async (phone = sessionStorage.getItem('token')) => {
        const res = await getTodosByPhone(phone)
        if (res.isSuccess) {
            this.setState({ todos: res.data.reverse() }, () => {
                // console.log(this.state.todos)
            })
        }
    }
    // 组件挂载完毕的钩子
    async componentDidMount() {
        PubSub.subscribe(ISLOGGEDIN, (_, data) => {
            // 登陆后
            this.setState({ isLogin: data })
            // 从本地获取todos与gettodo做比较，再同步云端
            const preTodos = localStorage.getItem('todos')
            console.log(preTodos);
            this.getTodos()

        })
        const isLogin = await checkLogin()
        if (isLogin) {
            this.setState({ isLogin })
            this.getTodos()

        } else {
            // 从本地取出数据,防止没有数据报错
            const todos = JSON.parse(localStorage.getItem('todos') || '[]')
            // 更新状态
            this.setState({ todos })
        }
    }
    // 组件完成更新的钩子
    componentDidUpdate() {
        // 设置数据
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
        // this.getTodos(sessionStorage.getItem('token'))

    }

    addTodo = async (name) => {
        // const isLogin = await checkLogin()
        const { isLogin } = this.state
        const { todos } = this.state
        const todo = {
            name,
            done: false
        }
        if (isLogin) {
            // 新增api
            todo.phone = sessionStorage.getItem('token')
            const res = await addTodos(todo)
            console.log(res);
            if (res.isSuccess) {
                this.getTodos()
            }

        } else {
            todo.id = (todos.length + 1)
            this.setState({ todos: [todo, ...todos] })
        }

    }
    // 用于更新一个todo对象
    updateTodo = async (id, done) => {
        const { todos, isLogin } = this.state

        if (isLogin) {
            const obj = {
                id,
                done
            }
            await updateDoneById(JSON.stringify(obj))
            this.getTodos()

        } else {
            const newTodos = todos.map((todoObj) => {
                if (todoObj.id === id) return { ...todoObj, done }
                else return todoObj
            })
            this.setState({ todos: newTodos })
        }

    }
    // 用于删除一个todo
    deleteTodo = async (id) => {
        const { todos, isLogin } = this.state
        if (isLogin) {
            const res = await deleteById(id)
            console.log(res);
            this.getTodos()
        } else {
            // 删除指定id的todo对象
            const newTodos = todos.filter(todo => todo.id !== id)
            // 更新状态
            this.setState({ todos: newTodos })
        }
    }
    // 用于全选
    checkAllTodo = (done) => {
        const { todos, isLogin } = this.state
        if (isLogin) {
            // 循环遍历所有的事项并调用单独的修改
            todos.map(todo => this.updateTodo(todo.id, done))
        } else {
            // 加工数据
            const newTodos = todos.map(todo => { return { ...todo, done } })
            // 更新状态
            this.setState({ todos: newTodos })
        }
    }
    clearAllDone = () => {
        const { todos, isLogin } = this.state
        if (isLogin) {
            const newTodos = todos.filter(todo => todo.done)
            newTodos.map(todo => this.deleteTodo(todo.id))

        } else {
            const newTodos = todos.filter(todo => !todo.done)
            this.setState({ todos: newTodos })
        }
    }
    render() {
        const { todos } = this.state
        return (
            <div className='container'>

                <div className="todo-container">
                    <div className="todo-wrap">
                        <Nav isLogin={this.state.isLogin} />

                        <Header addTodo={this.addTodo} />

                        <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />

                        <Footer style={{ display: todos.length === 0 ? 'none' : 'block' }} todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />

                    </div>
                </div>
            </div>

        )
    }
}
