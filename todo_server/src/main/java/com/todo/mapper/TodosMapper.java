package com.todo.mapper;

import com.todo.entity.Todos;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface TodosMapper {
    void addTodos(Todos todos);

//    @Select("select * from tb_todos where phone = #{phone} ;")
    List<Todos> getTodosByPhone(String phone);

    @Update("update tb_todos set done =#{done}  where id = #{id} ;")
    void updateDoneById(Todos todos);

    @Delete("delete from tb_todos where id = #{id};")
    void deleteById(Integer id);

}
