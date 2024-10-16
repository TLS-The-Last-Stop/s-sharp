package com.tls.ssharp.post.repository;

import com.tls.ssharp.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

}