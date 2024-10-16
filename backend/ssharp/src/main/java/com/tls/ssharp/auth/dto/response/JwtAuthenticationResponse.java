package com.tls.ssharp.auth.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class JwtAuthenticationResponse {
  private String accessToken;
  private String refreshToken;
  private String tokenType = "Bearer";

  public JwtAuthenticationResponse(String accessToken, String refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}