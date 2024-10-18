package com.tls.ssharp.post.controller;

import com.tls.ssharp.post.dto.request.PostRequest;
import com.tls.ssharp.post.dto.response.PostResponse;
import com.tls.ssharp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {
  private final PostService postService;

  @PostMapping("/api/post/register")
  public ResponseEntity<Void> savePost(@RequestBody PostRequest postRequest) {
    postService.savePost(postRequest);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/api/posts")
  public ResponseEntity<List<PostResponse>> getAllPost(){
    List<PostResponse> res = postService.getAllPost();
    System.out.println("@@@@@@@@@@@@@@@@@");
    return ResponseEntity.ok().body(res);
  }

  @GetMapping("/api/post/detail/{id}")
  public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
    PostResponse res = postService.getPostById(id);
    return ResponseEntity.ok().body(res);
  }

  @DeleteMapping("/api/post/{id}")
  public ResponseEntity<Void> deletePost(@PathVariable Long id) {
    postService.deletePostById(id);
    return ResponseEntity.ok().build();
  }
}