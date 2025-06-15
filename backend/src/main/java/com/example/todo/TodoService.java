package com.example.todo;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    private final TodoRepository repository;

    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    public List<Todo> findAll() {
        return repository.findAll();
    }

    public Todo add(Todo todo) {
        todo.setId(null);
        if (todo.getStatus() == null) {
            todo.setStatus(TodoStatus.TODO);
        }
        return repository.save(todo);
    }

    public Optional<Todo> update(long id, Todo updated) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setCompleted(updated.isCompleted());
            if (updated.getStatus() != null) {
                existing.setStatus(updated.getStatus());
            }
            if (updated.getAttachmentUrl() != null) {
                existing.setAttachmentUrl(updated.getAttachmentUrl());
            }
            return repository.save(existing);
        });
    }

    public Optional<Todo> updateAttachment(long id, String url) {
        return repository.findById(id).map(existing -> {
            existing.setAttachmentUrl(url);
            return repository.save(existing);
        });
    }

    public boolean delete(long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
