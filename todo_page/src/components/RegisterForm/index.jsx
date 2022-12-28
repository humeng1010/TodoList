import React from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    message,
} from 'antd';
// When the user enters the phone number can check whether the phone is the same there are some problems
import { register } from '../../api';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 18,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 15,
            offset: 9,
        },
    },
};
const RegisterForm = (props) => {
    const [messageApi, contextHolder] = message.useMessage()

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log(values)
        // 注册api，如果成功则关闭模态框，并提示成功，失败则不关闭，提示失败信息
        try {
            const data = await register(JSON.stringify(values))
            if (data.isSuccess) {
                messageApi.open({
                    type: 'success',
                    content: data.msg
                })
                // 关闭
                props.setIsModalOpen(false)

            } else {
                messageApi.open({
                    type: 'error',
                    content: data.msg
                })
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {contextHolder}
            <Form
                {...formItemLayout}
                form={form}
                name="注册"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[
                        {
                            type: 'phone',
                            message: '该手机号不合法!',
                        },
                        {
                            required: true,
                            message: '请输入您的手机号!',
                        },
                    ]}
                >
                    <Input placeholder='请输入您的手机号' />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的密码!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='请输入您的密码' />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请确认您的密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不匹配!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder='请确认您的密码' />
                </Form.Item>

                <Form.Item
                    name="nick"
                    label="昵称"
                    tooltip="您想要别人怎么称呼您?"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的昵称!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input placeholder='您想要别人怎么称呼您?' />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="性别"
                    rules={[
                        {
                            required: true,
                            message: '请选择您的性别!',
                        },
                    ]}
                >
                    <Select placeholder="选择您的性别">
                        <Option value="1">男</Option>
                        <Option value="0">女</Option>
                    </Select>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </>

    );
};
export default RegisterForm;