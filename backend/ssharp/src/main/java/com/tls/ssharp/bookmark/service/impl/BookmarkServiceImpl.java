package com.tls.ssharp.bookmark.service.impl;

import com.tls.ssharp.bookmark.dto.request.BookmarkRequest;
import com.tls.ssharp.bookmark.dto.response.BookmarkPostResponse;
import com.tls.ssharp.bookmark.dto.response.BookmarkResponse;
import com.tls.ssharp.bookmark.dto.response.BookmarkUserResponse;
import com.tls.ssharp.bookmark.entity.Bookmark;
import com.tls.ssharp.bookmark.repository.BookmarkRepository;
import com.tls.ssharp.bookmark.service.BookmarkService;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.post.repository.PostRepository;
import com.tls.ssharp.user.entity.User;
import com.tls.ssharp.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public boolean Bookmark(BookmarkRequest bookmarkRequest) {

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
    public List<BookmarkResponse> getBookmarkList(Long userId) {
        return bookmarkRepository.findByUserId(userId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private BookmarkResponse convertToResponse(Bookmark bookmark) {
        return new BookmarkResponse(
                bookmark.getId(),
                bookmark.getCreatedAt().toString(),
                bookmark.getUpdatedAt() != null ? bookmark.getUpdatedAt().toString() : null,
                new BookmarkUserResponse(bookmark.getUser().getId(), bookmark.getUser().getUsername()),
                new BookmarkPostResponse(bookmark.getPost().getId(), bookmark.getPost().getTitle(), bookmark.getPost().getContent())
        );
    }
}

