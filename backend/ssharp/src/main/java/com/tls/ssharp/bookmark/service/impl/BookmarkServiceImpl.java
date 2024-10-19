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

import java.awt.print.Book;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

	private final BookmarkRepository bookmarkRepository;
	private final PostRepository postRepository;
	private final UserRepository userRepository;

	public List<Bookmark> findAll() {
		return bookmarkRepository.findAll();
	}
	@Override
	public boolean Bookmark(BookmarkRequest bookmarkRequest) {
//		System.out.println("bookmarkRequest.getPostId() = " + bookmarkRequest.getPostId());
//		System.out.println("bookmarkRequest.getUserId() = " + bookmarkRequest.getUserId());

		User user = userRepository.findById(bookmarkRequest.getUserId())
						.orElseThrow(() -> new RuntimeException("User not found"));

		Post post = postRepository.findById(bookmarkRequest.getPostId())
						.orElseThrow(() -> new RuntimeException("Post not found"));

		Bookmark existingBookmark = bookmarkRepository.findByUserAndPost(user, post);

		if (existingBookmark != null) {
			bookmarkRepository.delete(existingBookmark);
		} else {
			Bookmark newBookmark = Bookmark.builder()
							.user(user)
							.post(post)
							.createdAt(LocalDateTime.now())
							.build();
			bookmarkRepository.save(newBookmark);
		}
		return false;
	}

	@Override
	public boolean isBookmarked(Long userId, Long postId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
		return bookmarkRepository.findByUserAndPost(user, post) != null;
	}

	@Override
	public List<Bookmark> getBookMarkList(Long userId) {
	List<Bookmark> bookmarkList = bookmarkRepository.findAll();
		return bookmarkList;
	}

}
