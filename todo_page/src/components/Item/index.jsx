import React, { Component } from 'react'
import './index.css'
import { Button } from 'antd'
export default class Item extends Component {
    state = {
        mouse: false
    }
    // 鼠标移入移除的回调
    handleMouse = (flag) => {
        return () => {
            this.setState({ mouse: flag })
        }
    }
    // 勾选、取消勾选某一个todo的回调
    handleCheck = (id) => {
        return (e) => {
            this.props.updateTodo(id, e.target.checked)
        }
    }
    // 删除的回调
    handleDelete = (id) => {
        // 注意这个地方的坑，需要使用window调用confirm否则报错
        if (window.confirm('确定删除吗?')) {
            this.props.deleteTodo(id)
        }
    }
    render() {
        const { id, name, done } = this.props
        const { mouse } = this.state
        return (
            <li className="animate__backInLeft" style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)} >
                <label>
                    <input type="checkbox" checked={done} onChange={this.handleCheck(id)} />
                    <span>{name}</span>
                </label>
                <Button type='primary' danger onClick={() => this.handleDelete(id)} style={{ display: mouse ? 'block' : 'none' }}>删除</Button>
            </li>
        )
    }
}
