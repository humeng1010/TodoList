import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { checkLogin, login } from '../../api'
import PubSub from 'pubsub-js'
import { ISLOGGEDIN } from '../../pubsubConstant';
const LoginForm = (props) => {
    const [messageApi, contextHolder] = message.useMessage()
    const onFinish = async (values) => {
        // 登陆api，登陆成功 立马 同步存储，并提示云端存储成功
        try {
            const data = await login(JSON.stringify(values))
            if (data.isSuccess) {
                // 登陆成功
                props.setIsModalOpen(false)

                sessionStorage.setItem('token', data.data)
                messageApi.open({
                    type: 'success',
                    content: data.msg,
                });

                // 再次请求后端，确定是否登陆，获取bool值方便后续判断
                const isLoggedIn = await checkLogin()
                // 发布消息，用户登陆成功了；订阅的组件有Nav、
                PubSub.publish(ISLOGGEDIN, isLoggedIn)

            } else {
                // 登陆失败
                messageApi.open({
                    type: 'warning',
                    content: data.msg,
                });
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: error,
            });
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <Form
                name="登陆"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                initialValues={{
                    remember: false,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 9,
                        span: 15,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        登陆
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default LoginForm;