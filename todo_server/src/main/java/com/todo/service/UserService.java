package com.todo.service;

import com.todo.controller.Result;
import com.todo.entity.User;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;

/**
 * 服务层接口
 */
@Transactional//对该类中的所有方法开启事务
public interface UserService {
    //    登陆
    Result login(String phone, String password, HttpSession session);

    //    注册
    Result register(User user);

    Result checkPhone(String phone);

    Result getUserNameByPhone(String phone);
}
