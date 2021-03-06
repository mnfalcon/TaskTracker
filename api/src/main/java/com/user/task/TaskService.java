package com.user.task;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
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

        if(!newTask.getTitle().equals("")){
            oldTask.setTitle(newTask.getTitle());
        }
        if (!newTask.getDescription().equals("")){
            oldTask.setDescription(newTask.getDescription());
        }
        oldTask.setCompleted(newTask.isCompleted());
        taskRepository.save(oldTask);
        return oldTask.toString();
    }

    public String getTask(Long taskId) {
        return taskRepository.findById(taskId).toString();
    }

    public Task getObjectTask(Long taskId){
        Optional<Task> t = taskRepository.findById(taskId);
        if (!t.isPresent()){
            throw new IllegalArgumentException("Task does not exist.");
        }
        return t.get();
    }

    public List<Task> getTasks(String username){
        List<Task> list = taskRepository.findAllByUsername(username);
        Collections.sort(list);
        return list;
    }
}
