package com.tls.ssharp.bookmark.repository;

import com.tls.ssharp.bookmark.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

	Bookmark findByPostId(Long postId);
}
