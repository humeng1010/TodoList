package com.todo.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.todo.controller.Result;
import com.todo.entity.User;
import com.todo.mapper.UserMapper;
import com.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 服务层
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Result login(String phone, String password) {

        User hasRegister = userMapper.hasRegister(phone);
        if (BeanUtil.isEmpty(hasRegister)) return Result.fail("您还未注册,快去注册吧~");

        User user = userMapper.login(phone, password);
        if (BeanUtil.isEmpty(user)) return Result.fail("密码错误了哦~");

        return Result.ok(user,"登陆成功");
    }

    @Override
    public Result register(User user) {

//        加锁,防止多线程并发引起同一时刻注册相同的手机号,都通过了这个if判断,导致其余产生数据库报错情况
        synchronized (this) {
            User hasRegister = userMapper.hasRegister(user.getPhone());
            if (BeanUtil.isNotEmpty(hasRegister)) return Result.fail("该手机号已被注册,请更换一个吧");
//        可以注册
            userMapper.register(user);
        }

        return Result.ok(null,"注册成功");
    }
}
