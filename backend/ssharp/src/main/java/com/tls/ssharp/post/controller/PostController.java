package com.tls.ssharp.post.controller;

import com.tls.ssharp.post.dto.request.PostRequest;
import com.tls.ssharp.post.dto.response.PostResponse;
import com.tls.ssharp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {
  private final PostService postService;

  @PostMapping("/api/post/register")
  public ResponseEntity<Void> savePost(@RequestBody PostRequest postRequest, Authentication authentication) {
    postService.savePost(postRequest, authentication);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/api/posts")
  public ResponseEntity<List<PostResponse>> getAllPost(){
    List<PostResponse> res = postService.getAllPost();
    return ResponseEntity.ok().body(res);
  }

  @GetMapping("/api/post/detail/{id}")
  public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
    PostResponse res = postService.getPostById(id);
    return ResponseEntity.ok().body(res);
  }

  @PutMapping("/api/post/{id}")
  public ResponseEntity<Void> updatePost(@PathVariable Long id, @RequestBody PostRequest postRequest) {
    //postService.updatePost(id, postRequest);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/api/post/{id}")
  public ResponseEntity<Void> deletePost(@PathVariable Long id) {
    postService.deletePostById(id);
    return ResponseEntity.ok().build();
  }
}