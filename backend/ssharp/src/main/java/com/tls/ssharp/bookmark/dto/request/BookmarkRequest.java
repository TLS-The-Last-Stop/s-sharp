package com.tls.ssharp.bookmark.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookmarkRequest {
    Long userId;
    Long postId;
}