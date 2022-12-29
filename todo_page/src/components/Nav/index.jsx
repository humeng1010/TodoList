import React, { useState, useEffect } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal, message } from 'antd';
import './index.css'
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm'
import PubSub from 'pubsub-js'
import { ISLOGGEDIN } from '../../pubsubConstant';
import { getNikeByPhone } from '../../api';

export default function Nav(props) {
    const [nickName, setNickName] = useState('')

    const { isLogin } = props

    const [messageApi, contextHolder] = message.useMessage()

    const getNike = () => {
        const token = sessionStorage.getItem('token')
        // 如果有token再发送请求
        if (token) {
            getNikeByPhone(token).then((value) => {
                setNickName(value.data === null ? <div style={{ color: '#ff4d4f' }}>登陆已失效,请退出重新登陆</div> : value.data)
            })
        }
    }

    useEffect(() => {
        // 第一次挂载
        if (isLogin) {
            messageApi.open({
                type: 'success',
                content: '已登陆，可享用云服务(*^▽^*)'
            })
        } else {
            messageApi.open({
                type: 'warning',
                content: '您还未登陆，不可享用云服务[○･｀Д´･ ○]',
            })
        }
        getNike()
        const sub = PubSub.subscribe(ISLOGGEDIN, (_, data) => {
            if (data) {
                getNike()
            }
        })

        return () => {
            PubSub.unsubscribe(sub)
        }
    }, [messageApi, isLogin])

    const exit = () => {
        // 退出登陆，清除sessionStorage，刷新页面，修改登陆状态，消息提示
        // TODO
        sessionStorage.clear()
        messageApi.open({
            type: 'warning',
            content: '您已退出登陆'
        })
        window.location.href = "/"
    }
    // 注册的模态框控制状态
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 登陆的
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // ==========================
    const showModal2 = () => {
        setIsModalOpen2(true);
    };
    const handleOk2 = () => {

        setIsModalOpen2(false);
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };
    return (

        <div className='nav'>
            {contextHolder}
            <Button onClick={showModal} style={{ display: isLogin ? 'none' : 'block' }} type="link">注册</Button>
            <Button onClick={showModal2} style={{ display: isLogin ? 'none' : 'block' }} type="link">登陆</Button>
            <Modal title="注册" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <RegisterForm setIsModalOpen={setIsModalOpen} />
            </Modal>
            <Modal title="登陆" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} footer={null}>
                <LoginForm setIsModalOpen={setIsModalOpen2} />
            </Modal>
            {/* --------------------------------------------------- */}
            <Avatar style={{ display: isLogin ? 'block' : 'none' }} shape="square" size="large" icon={<UserOutlined />} />
            <span style={{ display: isLogin ? 'block' : 'none' }} >{nickName}</span>
            <Button onClick={exit} style={{ display: isLogin ? 'block' : 'none' }} type="primary" danger>
                退出登陆
            </Button>
        </div>
    )
}
