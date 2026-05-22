package com.usermanagement.backend.service;

import com.usermanagement.backend.model.User;
import com.usermanagement.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.usermanagement.backend.exception.UserNotFoundException;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // GET ALL
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET BY ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    // CREATE USER
    public User saveUser(User user) {

        // ENCODE PASSWORD
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    // UPDATE USER
    public User updateUser(Long id, String name, String email, String newPassword, String currentPassword) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        user.setName(name);
        user.setEmail(email);

        // 🔐 CHECK CURRENT PASSWORD BEFORE UPDATE
        if (newPassword != null && !newPassword.isEmpty()) {

            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                throw new RuntimeException("Current password is incorrect");
            }

            user.setPassword(passwordEncoder.encode(newPassword));
        }

        return userRepository.save(user);
    }
    // DELETE USER
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // SEARCH USERS
    public List<User> searchUsers(String keyword) {
        return userRepository
                .findByNameContainingIgnoreCase(keyword);
    }
    
    public Page<User> getUsersPaginated(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
    
    public Page<User> searchUsersPaginated(String keyword, Pageable pageable) {
        return userRepository.findByNameContainingIgnoreCase(keyword, pageable);
    }
}