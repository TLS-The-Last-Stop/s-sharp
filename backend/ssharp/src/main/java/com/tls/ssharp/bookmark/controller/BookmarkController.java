package com.tls.ssharp.bookmark.controller;

import com.tls.ssharp.auth.common.dto.CommonApiResponse;
import com.tls.ssharp.bookmark.dto.request.BookmarkRequest;
import com.tls.ssharp.bookmark.entity.Bookmark;
import com.tls.ssharp.bookmark.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BookmarkController {

  private final BookmarkService bookmarkService;

  @PostMapping("/bookmark")
  public CommonApiResponse markBookmark(@RequestBody BookmarkRequest bookmarkRequest) {
    System.out.println("bookmarkRequest.getUserId() = " + bookmarkRequest.getUserId());
    System.out.println("bookmarkRequest.getPostId() = " + bookmarkRequest.getPostId());
    bookmarkService.saveBookmark(bookmarkRequest);
    return CommonApiResponse.createNoContent("성공함");
  }

}