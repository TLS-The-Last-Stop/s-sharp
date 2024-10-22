package com.tls.ssharp.bookmark.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookmarkPostResponse {
    private Long id;
    private String title;
    private String content;
}
