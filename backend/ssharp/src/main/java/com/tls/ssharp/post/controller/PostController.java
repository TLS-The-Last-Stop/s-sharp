package com.tls.ssharp.post.controller;

import com.tls.ssharp.post.dto.request.PostRequest;
import com.tls.ssharp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PostController {
  private final PostService postService;

  @PostMapping("/post")
  public ResponseEntity<Void> savepost(@RequestBody PostRequest postRequest) {
    postService.savePost(postRequest);
    return ResponseEntity.ok().build();
  }
}