package com.mph.tradefilemanagement.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mph.tradefilemanagement.model.User;

public interface UserRepository extends JpaRepository<User,Long>{
   Optional<User> findByUsername(String username);
}
