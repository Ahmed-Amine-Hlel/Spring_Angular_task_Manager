package com.sina.app.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sina.app.entities.Task;
import com.sina.app.resthelpers.TaskRequestBody;
import com.sina.app.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin
public class TaskRESTController {

	@Autowired
	TaskService taskService;

	@RequestMapping(method = RequestMethod.POST)
	public Task createTask(@RequestBody TaskRequestBody taskBody) {
		return taskService.saveTask(new Task(taskBody.getTitle(), taskBody.isCompleted()), taskBody.getUserId());
	}

	/**
	 * @param userId (optional defaults to null)
	 * @return A list of tasks, if the userId is specified only return the tasks
	 *         having that userId.
	 */
	@RequestMapping(method = RequestMethod.GET)
	public List<Task> getAllTasks(@RequestParam(required = false) Long userId) {
		return userId == null ? taskService.getAllTasks() : taskService.findByUserId(userId);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Task getTaskById(@PathVariable("id") Long id) {
		return taskService.getTask(id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public Task updateTask(@RequestBody TaskRequestBody taskBody) {
		return taskService.saveTask(new Task(taskBody.getId(), taskBody.getTitle(), taskBody.isCompleted()),
				taskBody.getUserId());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteTask(@PathVariable("id") Long id) {
		taskService.deleteTaskById(id);
	}
}
