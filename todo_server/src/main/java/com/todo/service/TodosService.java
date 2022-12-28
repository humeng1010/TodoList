package com.todo.service;

import com.todo.controller.Result;
import com.todo.entity.Todos;

public interface TodosService {
    Result addTodos(Todos todos);

    Result getTodosByPhone(String phone);

    Result updateDoneById(Todos todos);

    Result deleteById(Integer id);
}
