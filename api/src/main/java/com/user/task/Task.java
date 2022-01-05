package com.user.task;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@ToString()
@Entity
public class Task {

    @Id
    @SequenceGenerator(name = "tasks_gen", sequenceName = "tasks_sequence", allocationSize = 1)
    @GeneratedValue( strategy = GenerationType.SEQUENCE, generator = "tasks_gen")
    private Long id;
    private String username;
    private String title;
    @Column(nullable = true)
    private String description;
    private boolean isCompleted = false;

    public Task(String username, String title, String description, boolean isCompleted) {
        this.username = username;
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted;
    }
}
