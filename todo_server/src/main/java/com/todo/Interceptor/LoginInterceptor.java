package com.todo.Interceptor;

import cn.hutool.json.JSONUtil;
import com.todo.controller.Result;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 登陆拦截器
 */
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        String phone = request.getHeader("token");
        Object uuid = session.getAttribute(phone);
        if (uuid==null){
//            未登录 拦截请求
            response.setStatus(401);
            response.setContentType("application/json;charset=utf-8");
            Result fail = Result.fail("请先登陆后再操作");
            response.getWriter().write(JSONUtil.toJsonStr(fail));
            return false;
        }
        return true;
    }
}
