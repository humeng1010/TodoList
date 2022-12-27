import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Modal } from 'antd';
import './index.css'
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm'
export default function Nav() {
    const [isLogin, setIsLogin] = useState(false)
    const exit = () => {
        // 退出登陆，清除token，刷新页面，修改登陆状态，消息提示
        // TODO
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
            <Button onClick={showModal} style={{ display: isLogin ? 'none' : 'block' }} type="link">注册</Button>
            <Button onClick={showModal2} style={{ display: isLogin ? 'none' : 'block' }} type="link">登陆</Button>
            {/* register */}
            <Modal title="注册" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <RegisterForm setIsModalOpen={setIsModalOpen} />
            </Modal>
            <Modal title="登陆" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} footer={null}>
                <LoginForm setIsModalOpen={setIsModalOpen2} setIsLogin={setIsLogin} />
            </Modal>

            <Avatar style={{ display: isLogin ? 'block' : 'none' }} shape="square" size="large" icon={<UserOutlined />} />
            <span style={{ display: isLogin ? 'block' : 'none' }} >xxx上午好</span>
            <Button onClick={exit} style={{ display: isLogin ? 'block' : 'none' }} type="primary" danger>
                退出登陆
            </Button>
        </div>
    )
}
