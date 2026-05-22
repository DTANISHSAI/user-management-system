package com.usermanagement.backend.repository;

import com.usermanagement.backend.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByNameContainingIgnoreCase(String name);

    Page<User> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Optional<User> findByEmail(String email);
}