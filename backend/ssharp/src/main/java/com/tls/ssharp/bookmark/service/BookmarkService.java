package com.tls.ssharp.bookmark.service;

import com.tls.ssharp.bookmark.dto.request.BookmarkRequest;
import com.tls.ssharp.bookmark.entity.Bookmark;

import java.util.List;

public interface BookmarkService {
	boolean Bookmark(BookmarkRequest bookmarkRequest);

	boolean isBookmarked(Long userId, Long postId);

	List<Bookmark> getBookMarkList(Long userId);
}
