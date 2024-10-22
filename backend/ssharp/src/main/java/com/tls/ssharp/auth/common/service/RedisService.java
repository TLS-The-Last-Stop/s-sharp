package com.tls.ssharp.auth.common.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisService {

  private final RedisTemplate<String, Object> redisTemplate;

  public RedisService(RedisTemplate<String, Object> redisTemplate) {
    this.redisTemplate = redisTemplate;
  }

  public void addToBlacklist(String token, long expirationInMs) {
    redisTemplate.opsForValue().set(token, "BLACKLISTED", Duration.ofMillis(expirationInMs));
  }

  public boolean isBlacklisted(String token) {
    return redisTemplate.hasKey(token);
  }

  public void setValue(String key, String value) {
    redisTemplate.opsForValue().set(key, value);
  }

  public String getValue(String key) {
    return (String) redisTemplate.opsForValue().get(key);
  }

  public void deleteValue(String key) {
    redisTemplate.delete(key);
  }

}
