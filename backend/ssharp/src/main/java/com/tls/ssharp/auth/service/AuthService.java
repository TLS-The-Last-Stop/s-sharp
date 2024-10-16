package com.tls.ssharp.auth.service;

import com.tls.ssharp.auth.common.dto.CommonApiResponse;
import com.tls.ssharp.auth.dto.request.LoginRequest;
import com.tls.ssharp.auth.dto.request.SignUpRequest;
import com.tls.ssharp.auth.dto.response.JwtAuthenticationResponse;
import com.tls.ssharp.security.JwtTokenProvider;
import com.tls.ssharp.user.entity.User;
import com.tls.ssharp.user.repository.UserRepository;
import com.tls.ssharp.util.CookieUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;
  private final RefreshTokenService refreshTokenService;

  public CommonApiResponse<?> authenticateUser(LoginRequest loginRequest, HttpServletResponse response) {
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            )
    );

    String jwt = jwtTokenProvider.generateToken(authentication.getName());
    User user = userRepository.findByEmail(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));
    String refreshToken = refreshTokenService.createRefreshToken(user.getId());

    Cookie accessTokenCookie = CookieUtil.createAccessTokenCookie(jwt);
    Cookie refreshTokenCookie = CookieUtil.createRefreshTokenCookie(refreshToken);

    response.addCookie(accessTokenCookie);
    response.addCookie(refreshTokenCookie);

    return CommonApiResponse.createCreated("success", "로그인 성공");
  }

  public ResponseEntity<?> registerUser(SignUpRequest signUpRequest) {
    if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
      return ResponseEntity.badRequest().body("이미 사용 중인 이메일입니다.");
    }

    User user = User.builder()
            .email(signUpRequest.getEmail())
            .password(passwordEncoder.encode(signUpRequest.getPassword()))
            .username(signUpRequest.getName())
            .provider("LOCAL")
            .providerId("1")
            .roles(Set.of("ROLE_USER"))
            .build();

    userRepository.save(user);

    return ResponseEntity.ok("사용자 등록 성공");
  }

  public ResponseEntity<?> refreshToken(String requestRefreshToken) {
    return refreshTokenService.validateRefreshToken(requestRefreshToken)
            .map(userId -> {
              User user = userRepository.findById(userId).orElse(null);
              if (user == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("사용자를 찾을 수 없습니다.");
              }
              String newAccessToken = jwtTokenProvider.generateToken(user.getEmail());
              return ResponseEntity.ok(new JwtAuthenticationResponse(newAccessToken, requestRefreshToken));
            })
            .orElseGet(() -> ResponseEntity.status(HttpStatus.FORBIDDEN).body("Refresh Token이 유효하지 않습니다."));
  }

  public ResponseEntity<?> logout(String refreshToken) {
    refreshTokenService.deleteRefreshToken(refreshToken);
    return ResponseEntity.ok("로그아웃 성공");
  }
}
