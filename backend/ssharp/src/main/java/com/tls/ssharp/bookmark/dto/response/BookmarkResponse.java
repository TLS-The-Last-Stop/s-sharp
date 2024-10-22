package com.tls.ssharp.bookmark.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookmarkResponse {
    private Long id;
    private String createdAt;
    private String updatedAt;
    private BookmarkUserResponse user;
    private BookmarkPostResponse post;

    public BookmarkResponse(Long id, String createdAt, String updatedAt, Long userId, String username, Long postId, String title, String content) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = new BookmarkUserResponse(userId, username);
        this.post = new BookmarkPostResponse(postId, title, content);
    }
}