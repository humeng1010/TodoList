package com.todo.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.todo.controller.Result;
import com.todo.entity.Todos;
import com.todo.mapper.TodosMapper;
import com.todo.service.TodosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoServiceImpl implements TodosService {

    @Autowired
    private TodosMapper todosMapper;

    /**
     * 增
     * @param todos
     * @return
     */
    @Override
    public Result addTodos(Todos todos) {
        todosMapper.addTodos(todos);
        return Result.ok(null,"新增待办成功(*^▽^*)");
    }

    /**
     * 查
     * @param phone
     * @return
     */
    @Override
    public Result getTodosByPhone(String phone) {
        List<Todos> todos = todosMapper.getTodosByPhone(phone);
//        BeanUtil.copyProperties(todos,Todos.class,"phone");
        return Result.ok(todos,"成功获取该用户的待办事项");
    }

    /**
     * 改
     * @param todos
     * @return
     */
    @Override
    public Result updateDoneById(Todos todos) {
        todosMapper.updateDoneById(todos);
        return Result.ok(null,"更新成功");
    }

    /**
     * 删
     * @param id
     * @return
     */
    @Override
    public Result deleteById(Integer id) {
        todosMapper.deleteById(id);
        return Result.ok(null,"删除成功");
    }
}
