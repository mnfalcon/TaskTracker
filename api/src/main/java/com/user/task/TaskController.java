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
    public String deleteTask(@PathVariable Long taskId, @RequestHeader("Authorization") String bearerToken){
        checkTaskOwnership(taskId, bearerToken);
        taskService.deleteTask(taskId);
        return String.format("Deleted task %d", taskId);
    }


    @PutMapping(value = "api/tasks/{taskId}")
    public String editTask(@RequestBody Task task, @PathVariable Long taskId, @RequestHeader("Authorization") String bearerToken){
        checkTaskOwnership(taskId, bearerToken);
        return taskService.editTask(task, taskId);
    }

    @GetMapping(value = "api/tasks/{taskId}")
    public String getTask(@PathVariable Long taskId, @RequestHeader("Authorization") String bearerToken){
        checkTaskOwnership(taskId, bearerToken);
        return taskService.getTask(taskId);
    }

    @GetMapping(value = "api/tasks/user/{username}")
    public List<Task> getTasksByUser(@PathVariable String username, @RequestHeader("Authorization") String bearerToken){
        checkTaskOwnership(username, bearerToken);
        return taskService.getTasks(username);
    }

    private void checkTaskOwnership(Long taskId, String bearerToken) {
        String owner = auth.getTokenSubject(bearerToken);
        if (!owner.equals(taskService.getObjectTask(taskId).getUsername())){
            throw new IllegalStateException("You're not the owner of that task");
        }
    }

    private void checkTaskOwnership(String username, String bearerToken) {
        String owner = auth.getTokenSubject(bearerToken);
        if (!owner.equals(username)){
            throw new IllegalStateException("You're not the owner of that task");
        }
    }
}
