package com.tls.ssharp.user.service.impl;

import com.tls.ssharp.user.dto.request.UpdateUserRequest;
import com.tls.ssharp.user.dto.request.UserDto;
import com.tls.ssharp.user.entity.User;
import com.tls.ssharp.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public UserDto getUserByEmail(String email) {
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
    return toDto(user);
  }

  public void updateUserInfo(String email, UpdateUserRequest request) {
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
    user.setBio(request.getBio());
    userRepository.save(user);
  }

  public void deleteUser(String email) {
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
    userRepository.delete(user);
  }

  private UserDto toDto(User user) {
    UserDto dto = new UserDto();
    dto.setName(user.getUsername());
    dto.setEmail(user.getEmail());
    dto.setBio(user.getBio());
    return dto;
  }
}
