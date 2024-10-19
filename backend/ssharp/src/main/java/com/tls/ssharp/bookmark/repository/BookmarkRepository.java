package com.tls.ssharp.bookmark.repository;

import com.tls.ssharp.bookmark.entity.Bookmark;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

	Bookmark findByUserAndPost(User user, Post post);
}
