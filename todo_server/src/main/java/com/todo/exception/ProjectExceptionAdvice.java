package com.todo.exception;

import com.todo.controller.Result;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//声明这个类是处理REST风格开发的异常处理类
@RestControllerAdvice
public class ProjectExceptionAdvice {

    /**
     * 拦截所有异常 并返回错误信息对象,防止页面整体报错
     * @param exception
     * @return
     */
    @ExceptionHandler(Exception.class)
    public Result doException(Exception exception){
        return Result.fail(exception.getMessage());
    }
}
