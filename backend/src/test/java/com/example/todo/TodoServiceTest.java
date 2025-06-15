package com.example.todo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TodoServiceTest {
    @Autowired
    private TodoService service;

    @Test
    void addTodo() {
        Todo todo = new Todo();
        todo.setTitle("task");
        Todo saved = service.add(todo);
        assertNotNull(saved.getId());
        assertEquals("task", saved.getTitle());
        assertEquals(1, service.findAll().size());
    }
}
