package com.sina.app.service;

import java.util.List;

import com.sina.app.entities.Task;

public interface TaskService {
	Task saveTask(Task task, Long userId);

	Task updateTask(Task task);

	void deleteTaskById(Long id);

	Task getTask(Long id);

	List<Task> getAllTasks();

	// These methods are not predefined
	List<Task> findByCompleted(boolean isCompleted);

	List<Task> findByUserId(Long userId);
}
