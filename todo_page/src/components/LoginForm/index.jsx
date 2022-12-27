import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '../../api'
const LoginForm = (props) => {
    const onFinish = async (values) => {
        // 登陆api，登陆成功 立马 同步存储，并提示云端存储成功
        try {
            const data = await login(JSON.stringify(values))
            console.log(data);
            props.setIsModalOpen(false)
            console.log('Success:', values);
        } catch (error) {
            console.log(error);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
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
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
export default LoginForm;