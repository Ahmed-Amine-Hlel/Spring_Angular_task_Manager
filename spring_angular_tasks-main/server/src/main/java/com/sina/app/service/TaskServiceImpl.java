package com.sina.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sina.app.entities.Task;
import com.sina.app.repos.TaskRepository;
import com.sina.app.repos.UserRepository;

@Service
public class TaskServiceImpl implements TaskService {
	@Autowired
	TaskRepository taskRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public Task saveTask(Task task, Long userId) {
		// Get a reference to the user from the provided id
		task.setUser(userRepository.findById(userId).get());
		return taskRepository.save(task);
	}

	@Override
	public Task updateTask(Task task) {
		return taskRepository.save(task);
	}

	@Override
	public void deleteTaskById(Long id) {
		taskRepository.deleteById(id);
	}

	@Override
	public Task getTask(Long id) {
		return taskRepository.findById(id).get();
	}

	@Override
	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	@Override
	public List<Task> findByCompleted(boolean isCompleted) {
		return taskRepository.findByCompleted(isCompleted);
	}

	@Override
	public List<Task> findByUserId(Long userId) {
		return taskRepository.findByUserId(userId);
	}
}
