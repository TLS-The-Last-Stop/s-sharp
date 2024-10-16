package com.tls.ssharp.user.dto.request;

import lombok.Data;

@Data
public class UpdateUserRequest {
  private String bio;
  private String profileImageUrl;
}