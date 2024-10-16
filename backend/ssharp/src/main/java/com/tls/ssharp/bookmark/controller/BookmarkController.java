package com.tls.ssharp.bookmark.controller;

import com.tls.ssharp.bookmark.dto.request.BookmarkRequest;
import com.tls.ssharp.bookmark.entity.Bookmark;
import com.tls.ssharp.bookmark.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

  private final BookmarkService bookmarkService;

  @PostMapping
  public void markBookmark(@RequestBody BookmarkRequest bookmarkRequest) {
    System.out.println("bookmarkRequest.getUserId() = " + bookmarkRequest.getUserId());
    System.out.println("bookmarkRequest.getPostId() = " + bookmarkRequest.getPostId());
    bookmarkService.saveBookmark(bookmarkRequest);
  }

}