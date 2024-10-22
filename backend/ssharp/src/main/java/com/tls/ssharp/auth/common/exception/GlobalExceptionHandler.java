package com.tls.ssharp.auth.common.exception;

import com.tls.ssharp.auth.common.dto.CommonApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(Exception.class)
  public ResponseEntity<CommonApiResponse<Void>> handleGenericException(Exception ex) {
    return ResponseEntity.status(CommonApiResponse.INTERNAL_SERVER_ERROR)
            .body(CommonApiResponse.createInternalServerError("ssharp 서버 오류"));
  }

}
