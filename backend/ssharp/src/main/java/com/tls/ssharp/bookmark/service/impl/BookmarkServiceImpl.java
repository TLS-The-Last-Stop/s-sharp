package com.tls.ssharp.bookmark.service.impl;

import com.tls.ssharp.bookmark.dto.request.BookmarkRequest;
import com.tls.ssharp.bookmark.entity.Bookmark;
import com.tls.ssharp.bookmark.repository.BookmarkRepository;
import com.tls.ssharp.bookmark.service.BookmarkService;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.post.repository.PostRepository;
import com.tls.ssharp.user.entity.User;
import com.tls.ssharp.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

	private final BookmarkRepository bookmarkRepository;
	private final PostRepository postRepository;
	private final UserRepository userRepository;

	@Override
	public Bookmark saveBookmark(BookmarkRequest bookmarkRequest) {
		Bookmark bookmark = bookmarkRepository.findByPostId(bookmarkRequest.getPostId());
		if (bookmark == null) {
			bookmark = new Bookmark();
			User user = userRepository.findById(bookmarkRequest.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
			bookmark.setUser(user);

			Post post = postRepository.findById(bookmarkRequest.getPostId()).orElseThrow(() -> new RuntimeException("Post not found"));
			bookmark.setPost(post);

			System.out.println("post.getId() = " + post.getId());
			System.out.println("bookmarkRequest.getPostId() = " + bookmarkRequest.getPostId());

			System.out.println("user.getId() = " + user.getId());
			System.out.println("bookmarkRequest.getUserId() = " + bookmarkRequest.getUserId());

			return bookmarkRepository.save(bookmark);

		} else {
			throw new RuntimeException("이미 있음요 ^^");
		}
	}

}
