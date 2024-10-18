package com.tls.ssharp.post.dto.response;

import com.tls.ssharp.auth.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse extends BaseEntity {
  private long id;
  private long userId;
  private String title;
  private String content;
  private List<String> tags;
}