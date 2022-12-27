package com.todo.controller;

import com.todo.entity.User;
import com.todo.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 控制层
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    /**
     * 登陆接口
     * @param phone 手机号
     * @param password 密码
     * @return Result
     */
    @PostMapping("/login")
    public Result login( String phone,  String password){
        return userService.login(phone,password);
    }

    /**
     * 注册接口
     * @param user 用户
     * @return Result
     */
    @PutMapping("/register")
    public Result register(@RequestBody User user){
        return userService.register(user);
    }
}
