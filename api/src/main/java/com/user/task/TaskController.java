package com.user.task;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping
public class TaskController {
    private final TaskService taskService;

    @PostMapping(value = "/api/tasks")
    public String addTask(@RequestBody Task task){
        taskService.addTask(task);
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
