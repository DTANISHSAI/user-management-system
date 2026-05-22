package com.usermanagement.backend.controller;

import com.usermanagement.backend.model.User; 
import com.usermanagement.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import jakarta.validation.Valid;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // GET ALL USERS
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // CREATE USER ✅ FIXED
    @PostMapping
    public User createUser(@Valid @RequestBody User user) {

        // 🔐 ENCRYPT PASSWORD BEFORE SAVING
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userService.saveUser(user);
    }

    // UPDATE USER ✅ FIXED (WITH CURRENT PASSWORD CHECK)
    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, String> payload
    ) {

        return userService.updateUser(
                id,
                payload.get("name"),
                payload.get("email"),
                payload.get("password"),        // new password
                payload.get("currentPassword")  // current password
        );
    }

    // DELETE USER
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // SEARCH USERS
    @GetMapping("/search")
    public List<User> searchUsers(
            @RequestParam String keyword
    ) {
        return userService.searchUsers(keyword);
    }
    
    @GetMapping("/paginated")
    public Page<User> getUsersPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String keyword
    ) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        if (keyword != null && !keyword.isEmpty()) {
            return userService.searchUsersPaginated(keyword, pageable);
        }

        return userService.getUsersPaginated(pageable);
    }
}