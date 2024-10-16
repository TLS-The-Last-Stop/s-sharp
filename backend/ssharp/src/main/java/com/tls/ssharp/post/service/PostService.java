package com.tls.ssharp.post.service;

import com.tls.ssharp.post.dto.request.PostRequest;

public interface PostService {
  void savePost(PostRequest postRequest);
}
