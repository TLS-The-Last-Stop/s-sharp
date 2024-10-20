package com.tls.ssharp.review.dto.response;

import lombok.Data;

@Data
public class ReviewResponseDTO {
  private Long id;
  private String content;
  private int rating;
  private UserDTO user;  // 사용자 정보도 응답에 포함

  public ReviewResponseDTO(Long id, String content, int rating, UserDTO user) {
    this.id = id;
    this.content = content;
    this.rating = rating;
    this.user = user;
  }
}
