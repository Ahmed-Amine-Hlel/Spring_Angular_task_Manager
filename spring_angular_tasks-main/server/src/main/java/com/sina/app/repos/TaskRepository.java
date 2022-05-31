package com.sina.app.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sina.app.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
	List<Task> findByCompleted(boolean isCompleted);

	List<Task> findByUserId(Long userId);
}
