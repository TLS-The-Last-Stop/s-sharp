package com.tls.ssharp.user.dto.request;

import lombok.Data;

@Data
public class UserDto {
  private String name;
  private String email;
  private String phone;
  private String bio;
  private String profileImageUrl;
}