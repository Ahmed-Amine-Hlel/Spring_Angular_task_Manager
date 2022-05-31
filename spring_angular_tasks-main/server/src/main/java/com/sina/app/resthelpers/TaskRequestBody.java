package com.sina.app.resthelpers;

import lombok.Data;

@Data
public class TaskRequestBody {
	private Long id;
	private String title;
	private boolean completed;
	private Long userId;
}
