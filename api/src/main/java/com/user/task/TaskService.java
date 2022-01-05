package com.user.task;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public void addTask(Task task){
        taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    public String editTask(Task newTask, Long taskId){
        Optional<Task> optTask = taskRepository.findById(taskId);
        if (!optTask.isPresent()){
            throw new IllegalStateException("Task does not exist.");
        }
        Task oldTask = optTask.get();
        oldTask.setTitle(newTask.getTitle());
        oldTask.setDescription(newTask.getDescription());
        oldTask.setCompleted(newTask.isCompleted());
        taskRepository.save(oldTask);
        return oldTask.toString();
    }

    public String getTask(Long taskId) {
        return taskRepository.findById(taskId).toString();
    }

    public List<Task> getTasks(String username){
        return taskRepository.findAllByUsername(username);
    }
}
