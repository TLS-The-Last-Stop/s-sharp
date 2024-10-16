package com.tls.ssharp.post.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostRequest {
  private String title;
  private String content;
  private List<String> tags;
}