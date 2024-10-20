package com.tls.ssharp.post.service;

import com.tls.ssharp.post.dto.request.PostRequest;
import com.tls.ssharp.post.dto.response.PostResponse;
import com.tls.ssharp.post.entity.Tag;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface PostService {
  void savePost(PostRequest postRequest, Authentication authentication);
  List<PostResponse> getAllPost();
  PostResponse getPostById(long id);
  void updatePostById(long id, PostRequest postRequest, Authentication authentication);
  void deletePostById(long id);
}