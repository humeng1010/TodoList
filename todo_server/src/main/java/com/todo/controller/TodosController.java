package com.todo.controller;

import com.todo.entity.Todos;
import com.todo.service.TodosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todos")
public class TodosController {

    @Autowired
    private TodosService todosService;

    @PostMapping("/add")
    public Result addTodos(@RequestBody Todos todos) {
        return todosService.addTodos(todos);
    }

    @GetMapping("/{phone}")
    public Result getTodosByPhone(@PathVariable String phone) {
        return todosService.getTodosByPhone(phone);
    }

    @PutMapping("/update")
    public Result updateDoneById(@RequestBody Todos todos) {
        return todosService.updateDoneById(todos);
    }

    @DeleteMapping("/delete")
    public Result deleteById(@RequestBody Integer id) {
        return todosService.deleteById(id);
    }
}
