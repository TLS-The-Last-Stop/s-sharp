package com.tls.ssharp.auth.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenRefreshRequest {

  private String refreshToken;

}