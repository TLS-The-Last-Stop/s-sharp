package com.tls.ssharp.post.repository;

import com.tls.ssharp.post.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
}