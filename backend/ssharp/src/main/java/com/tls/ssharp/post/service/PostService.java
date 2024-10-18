package com.tls.ssharp.post.service;

import com.tls.ssharp.post.dto.request.PostRequest;
import com.tls.ssharp.post.dto.response.PostResponse;

import java.util.List;

public interface PostService {
  void savePost(PostRequest postRequest);
  List<PostResponse> getAllPost();
  PostResponse getPostById(long id);
  void deletePostById(long id);
}
