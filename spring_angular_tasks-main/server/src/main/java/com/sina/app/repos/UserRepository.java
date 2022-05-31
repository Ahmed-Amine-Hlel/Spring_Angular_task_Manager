package com.sina.app.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import com.sina.app.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByRobotName(String robotName);

    /**
     * Find the users with a number of tasks that's less or equals the given
     * parameter.
     * 
     * @param maxTasksNumber
     * @return List of users.
     */
    @Query("SELECT DISTINCT u FROM User u, Task t WHERE u.id = t.user.id AND (SELECT COUNT(*) FROM Task WHERE user.id = u.id) <= ?1")
    List<User> findByTasksLessThan(Long maxTasksNumber);
}
