package com.tls.ssharp.user.controller;

import com.tls.ssharp.user.dto.request.UpdateUserRequest;
import com.tls.ssharp.user.dto.request.UserDto;
import com.tls.ssharp.user.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {


  private final UserService userService;

  @GetMapping("/me")
  public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
    String email = authentication.getName();
    UserDto user = userService.getUserByEmail(email);
    return ResponseEntity.ok(user);
  }

  @PutMapping("/me")
  public ResponseEntity<?> updateUserInfo(@RequestBody UpdateUserRequest request, Authentication authentication) {
    String email = authentication.getName();
    userService.updateUserInfo(email, request);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/me")
  public ResponseEntity<?> deleteUser(Authentication authentication) {
    String email = authentication.getName();
    userService.deleteUser(email);
    return ResponseEntity.ok().build();
  }

}
