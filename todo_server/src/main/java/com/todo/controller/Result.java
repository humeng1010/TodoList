package com.todo.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private Boolean isSuccess;
    private Object data;
    private String msg;


    public Result(Boolean isSuccess,String msg){
        this.isSuccess = isSuccess;
        this.msg=msg;
    }


    public static  Result ok(Object data,String msg){
        return new Result(true,data,msg);
    }

    public static  Result fail(String msg){
        return new Result(false,msg);
    }


}
