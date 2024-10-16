package com.tls.ssharp.bookmark.service;

import com.tls.ssharp.bookmark.dto.request.BookmarkRequest;
import com.tls.ssharp.bookmark.entity.Bookmark;

public interface BookmarkService {
	Bookmark saveBookmark(BookmarkRequest bookmarkRequest);
}
