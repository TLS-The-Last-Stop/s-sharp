package com.tls.ssharp.auth.controller;

import com.tls.ssharp.auth.common.dto.CommonApiResponse;
import com.tls.ssharp.auth.dto.request.LoginRequest;
import com.tls.ssharp.auth.dto.request.LogoutRequest;
import com.tls.ssharp.auth.dto.request.SignUpRequest;
import com.tls.ssharp.auth.dto.request.TokenRefreshRequest;
import com.tls.ssharp.auth.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "reservation", description = "Reservation API")
public class AuthController {

  private final AuthService authService;

  @PostMapping("/login")
  public CommonApiResponse<?> authenticateUser(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
    return authService.authenticateUser(loginRequest, response);
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
    return authService.registerUser(signUpRequest);
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest request) {
    return authService.refreshToken(request.getRefreshToken());
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logout(@RequestBody LogoutRequest logoutRequest) {
    return authService.logout(logoutRequest.getRefreshToken());
  }
}
