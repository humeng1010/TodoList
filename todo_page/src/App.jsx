import React, { Component } from 'react'

import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'

import './App.css'
import Nav from './components/Nav'


export default class App extends Component {
    // 初始化状态
    state = {
        todos: []
    }
    // 组件挂载完毕的钩子
    componentDidMount() {
        // 从本地取出数据
        const todos = JSON.parse(localStorage.getItem('todos'))
        // 更新状态
        this.setState({ todos })
    }
    // 组件完成更新的钩子
    componentDidUpdate() {
        // 设置数据
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }
    addTodo = (name) => {
        const { todos } = this.state
        const todo = {
            id: (todos.length + 1),
            name,
            done: false
        }
        todos.unshift(todo)
        this.setState({ todos })
    }
    // 用于更新一个todo对象
    updateTodo = (id, done) => {
        const { todos } = this.state
        const newTodos = todos.map((todoObj) => {
            if (todoObj.id === id) return { ...todoObj, done }
            else return todoObj
        })
        this.setState({ todos: newTodos })
    }
    // 用于删除一个todo
    deleteTodo = (id) => {
        const { todos } = this.state
        // 删除指定id的todo对象
        const newTodos = todos.filter(todo => todo.id !== id)
        // 更新状态
        this.setState({ todos: newTodos })
    }
    // 用于全选
    checkAllTodo = (done) => {
        // 获取原来的todos
        const { todos } = this.state
        // 加工数据
        const newTodos = todos.map(todo => { return { ...todo, done } })
        // 更新状态
        this.setState({ todos: newTodos })
    }
    clearAllDone = () => {
        const { todos } = this.state
        const newTodos = todos.filter(todo => !todo.done)
        this.setState({ todos: newTodos })
    }
    render() {
        const { todos } = this.state
        return (
            <div className='container'>

                <div className="todo-container">
                    <div className="todo-wrap">
                        <Nav />

                        <Header addTodo={this.addTodo} />

                        <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />

                        <Footer style={{ display: todos.length === 0 ? 'none' : 'block' }} todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />

                    </div>
                </div>
            </div>

        )
    }
}
