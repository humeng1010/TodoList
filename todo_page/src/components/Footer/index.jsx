import React, { Component } from 'react'

import { Button } from 'antd'
import './index.css'
export default class Footer extends Component {
    // 全选checkBox的回调
    handleCheckAll = (e) => {
        this.props.checkAllTodo(e.target.checked)
    }
    // 清除所有已完成的
    handleClearAllDone = () => {
        if (window.confirm('确定清除所有已完成的任务?'))
            this.props.clearAllDone()
    }
    render() {
        const { todos, style } = this.props
        // 已完成的个数
        const doneCount = todos.reduce((pre, current) => pre + (current.done ? 1 : 0), 0)
        // 总数
        const total = todos.length
        return (
            <div className="todo-footer" style={style}>
                <label>
                    <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount === total && total !== 0 ? true : false} />
                </label>
                <span>
                    <span>已完成{doneCount}</span> / 全部{total}
                </span>
                <Button onClick={this.handleClearAllDone} type="primary" danger>
                    清除已完成任务
                </Button>
            </div>
        )
    }
}
