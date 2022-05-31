package com.sina.app.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String robotName;
	private String maker;
	@Column(unique = true)
	private Long price;
	private String password;
	private Date createdAt;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Task> tasks;

	public User(String robotName, String maker, Long price, String password, Date createdAt) {
		super();
		this.robotName = robotName;
		this.maker = maker;
		this.price = price;
		this.password = password;
		this.createdAt = createdAt;
	}
}
