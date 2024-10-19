package com.tls.ssharp.bookmark.controller;

import com.tls.ssharp.auth.common.dto.CommonApiResponse;
import com.tls.ssharp.bookmark.dto.request.BookmarkRequest;
import com.tls.ssharp.bookmark.entity.Bookmark;
import com.tls.ssharp.bookmark.service.BookmarkService;
import com.tls.ssharp.user.entity.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BookmarkController {

  private final BookmarkService bookmarkService;

  @PostMapping("/bookmark")
  public CommonApiResponse markBookmark(@RequestBody BookmarkRequest bookmarkRequest, Authentication authentication) {
    if (authentication == null || authentication.getPrincipal() == null) {
      return CommonApiResponse.createError("인증 정보가 올바르지 않습니다.");
    }
    UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
    Long userId = user.getId();
    bookmarkRequest.setUserId(userId);

    boolean isNewBookmark = bookmarkService.Bookmark(bookmarkRequest);
    String message = isNewBookmark ? "북마크가 추가되었습니다." : "북마크가 제거되었습니다.";
    return CommonApiResponse.createNoContent(message);
  }

  @GetMapping("/bookmark/status")
  public ResponseEntity<Map<String, Boolean>> checkBookmarkStatus(@RequestParam Long userId, @RequestParam Long postId) {
    boolean isBookmarked = bookmarkService.isBookmarked(userId, postId);
    Map<String, Boolean> response = Collections.singletonMap("isBookmarked", isBookmarked);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/bookmark-list")
  public ResponseEntity<List<Bookmark>> getBookmarkList(Authentication authentication) {
    UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
    Long userId = user.getId();
    List<Bookmark> bookmarkList = bookmarkService.getBookMarkList(userId);
    return ResponseEntity.ok(bookmarkList);
  }
}