package com.user.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByUsername(String username);
}
