package com.example.todo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.todo.FileStorageService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "*")
public class TodoController {
    private final TodoService service;
    private final FileStorageService storage;

    public TodoController(TodoService service, FileStorageService storage) {
        this.service = service;
        this.storage = storage;
    }

    @GetMapping
    public List<Todo> all() {
        return service.findAll();
    }

    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return service.add(todo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable long id, @RequestBody Todo todo) {
        return service.update(id, todo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        return service.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/attachment")
    public ResponseEntity<Todo> upload(@PathVariable long id, @RequestParam("file") MultipartFile file) throws IOException {
        String url = storage.store(file);
        return service.updateAttachment(id, url)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
