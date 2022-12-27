package com.todo.service;

import com.todo.controller.Result;
import com.todo.entity.User;
import org.springframework.transaction.annotation.Transactional;

/**
 * 服务层接口
 */
@Transactional//对该类中的所有方法开启事务
public interface UserService {
    //    登陆
    Result login(String phone, String password);

    //    注册
    Result register(User user);
}
