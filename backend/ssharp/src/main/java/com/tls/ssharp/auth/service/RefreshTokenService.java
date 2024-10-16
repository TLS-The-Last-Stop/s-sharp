package com.tls.ssharp.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

  private final RedisTemplate<String, String> redisTemplate;

  @Value("${jwt.refresh-expiration-in-ms}")
  private Long refreshTokenDurationMs;

  private static final String REFRESH_TOKEN_PREFIX = "refresh_token:";

  public String createRefreshToken(Long userId) {
    String refreshToken = UUID.randomUUID().toString();
    String key = REFRESH_TOKEN_PREFIX + refreshToken;
    redisTemplate.opsForValue().set(key, userId.toString(), Duration.ofMillis(refreshTokenDurationMs));
    return refreshToken;
  }

  public Optional<Long> validateRefreshToken(String token) {
    String key = REFRESH_TOKEN_PREFIX + token;
    String userIdStr = redisTemplate.opsForValue().get(key);
    if (userIdStr != null) {
      try {
        return Optional.of(Long.valueOf(userIdStr));
      } catch (NumberFormatException e) {
        return Optional.empty();
      }
    }
    return Optional.empty();
  }

  public void deleteRefreshToken(String token) {
    String key = REFRESH_TOKEN_PREFIX + token;
    redisTemplate.delete(key);
  }

}
