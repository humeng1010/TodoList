package com.todo.mapper;

import com.todo.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 数据层
 */
@Mapper
public interface UserMapper {

//    登陆
    User login(@Param("phone") String phone,@Param("password") String password);

//    注册
    void register(User user);

//    判断当前手机号是否被注册
    User hasRegister(String phone);
}
