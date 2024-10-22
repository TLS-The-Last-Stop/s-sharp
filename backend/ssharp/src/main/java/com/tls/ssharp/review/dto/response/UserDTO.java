package com.tls.ssharp.review.dto.response;

import lombok.Data;

@Data
public class UserDTO {
  private Long id;
  private String username;

  public UserDTO(Long id, String username) {
    this.id = id;
    this.username = username;
  }
}
