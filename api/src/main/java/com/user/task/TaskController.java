package com.user.task;

import com.user.security.JWTAuthorizationFilter;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping
public class TaskController {
    private final TaskService taskService;
    private JWTAuthorizationFilter auth;

    @PostMapping(value = "/api/tasks")
    public String addTask(@RequestBody Task task, @RequestHeader("Authorization") String bearerToken){
        task.setUsername(auth.getTokenSubject(bearerToken));
        taskService.addTask(task);
        System.out.println("Posting task");
        return task.toString();
    }

    @DeleteMapping(value = "/api/tasks/{taskId}")
    public String deleteTask(@PathVariable Long taskId){
        taskService.deleteTask(taskId);
        return String.format("Deleted task %d", taskId);
    }

    @PutMapping(value = "api/tasks/{taskId}")
    public String editTask(@RequestBody Task task, @PathVariable Long taskId){
        return taskService.editTask(task, taskId);
    }

    @GetMapping(value = "api/tasks/{taskId}")
    public String getTask(@PathVariable Long taskId){
        return taskService.getTask(taskId);
    }

    @GetMapping(value = "api/tasks/user/{username}")
    public List<Task> getTasksByUser(@PathVariable String username){
        return taskService.getTasks(username);
    }
}
