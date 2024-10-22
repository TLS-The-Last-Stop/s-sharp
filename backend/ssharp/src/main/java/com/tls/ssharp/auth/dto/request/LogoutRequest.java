package com.tls.ssharp.auth.dto.request;

import lombok.*;

@Getter
@Setter
public class LogoutRequest {

  private String refreshToken;

}