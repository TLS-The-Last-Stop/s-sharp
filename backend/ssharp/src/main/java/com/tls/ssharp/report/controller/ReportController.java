package com.tls.ssharp.report.controller;

import com.tls.ssharp.auth.common.dto.CommonApiResponse;
import com.tls.ssharp.report.domain.dto.ReportApiResponse;
import com.tls.ssharp.report.domain.dto.ReportApiRequest;
import com.tls.ssharp.report.service.ReportService;
import com.tls.ssharp.user.entity.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ReportController {

  private final ReportService reportService;

  @PostMapping("/posts/{postId}/report")
  public CommonApiResponse createReport(final @RequestBody ReportApiRequest dto, Authentication auth) {
    if (auth == null) return CommonApiResponse.createBadRequest("로그인을 먼저 해주세요.");
    reportService.saveReport(dto, auth);
    return CommonApiResponse.createNoContent("성공!!");
  }

  @GetMapping("/post/{postId}/report")
  public CommonApiResponse<?> checkReport(@PathVariable final Long postId, Authentication auth) {
    if (auth == null) return CommonApiResponse.createBadRequest("로그인을 먼저 해주세요.");

    UserPrincipal user = (UserPrincipal) auth.getPrincipal();
    boolean reportResult = reportService.isReportedBy(postId, user.getId());

    return CommonApiResponse.createNoContent(reportResult + "");
  }

  @GetMapping("/reports")
  public CommonApiResponse<?> getAllReport(
          @RequestParam(value = "page", required = false, defaultValue = "0") int page,
          @RequestParam(value = "size", required = false, defaultValue = "50") int size,
          @RequestParam(value = "keyword", required = false) String keyword,
          @RequestParam(value = "searchType", required = false, defaultValue = "all") String searchType) {

    if (page > 0) page--;

    Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

    //Page<Report> allReport = reportService.findReportsBySearch(pageable);
    Page<ReportApiResponse> allReport = reportService.findReportsBySearch(pageable, searchType, keyword);

    if (!allReport.hasContent())
      return CommonApiResponse.createBadRequest("존재하지 않음");

    return CommonApiResponse.createCreated("전체 신고 목록", allReport);
  }

  @GetMapping("/post/{postId}/reports")
  public ResponseEntity<List<ReportApiResponse>> getAllReports(@PathVariable(value = "postId", required = false) Long postId,
                                                               @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                                               @RequestParam(value = "size", required = false, defaultValue = "50") int size) {


    if (page > 0) page--;

    PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
    List<ReportApiResponse> list = reportService.findReportByPostId(postId, pageRequest);

    return ResponseEntity.status(HttpStatus.OK).body(list);
  }


}
