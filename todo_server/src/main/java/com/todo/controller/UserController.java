package com.todo.controller;

import com.todo.entity.User;
import com.todo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * 控制层
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    /**
     * 检查用户是否登陆,返回前端状态信息,使前端动态处理是否需要云存储
     * @param session
     * @param request
     * @return
     */
    @GetMapping
    public ResponseEntity<?> getUser(HttpSession session, HttpServletRequest request) {
        String phone = request.getHeader("token");
        // 检查用户是否已登录
        Object user = session.getAttribute(phone);
        if (user == null) {
            // 用户未登录，返回错误信息
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        // 用户已登录，返回用户信息
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    /**
     * 登陆接口
     * @param user 用户(只包含手机号,和密码)
     * @return Result
     */
    @PostMapping("/login")
    public Result login(@RequestBody User user, HttpSession session){
        return userService.login(user.getPhone(),user.getPassword(),session);
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

    /**
     * 检查手机号是否重复
     * @param phone
     * @return
     */
    @PostMapping("/check")
    public Result checkPhone(@RequestBody String phone){
        return userService.checkPhone(phone);
    }
    @GetMapping("/{phone}")
    public Result getUserNameByPhone(@PathVariable String phone){
        return userService.getUserNameByPhone(phone);
    }


}
