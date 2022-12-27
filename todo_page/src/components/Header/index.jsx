import React, { Component } from 'react';

import PropTypes from 'prop-types';
import './index.css'
export default class Header extends Component {
    // 对接收的props进行类型以及必要性的限制
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }
    // 键盘事件的回调
    handleKeyUp = (e) => {
        const { keyCode, target } = e
        if (keyCode !== 13) return
        if (!target.value.trim()) {
            alert('输入不能为空')
            return
        }
        // 将用户输入的值传递给App
        this.props.addTodo(target.value)
        target.value = ''
    }
    render() {
        return (
            <div className="todo-header">
                <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        )
    }
}