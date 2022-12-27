package com.todo.entity;

import lombok.Data;

@Data
public class User {
    private String phone;
    private String password;
    private String nick;
    private Character gender;
}
