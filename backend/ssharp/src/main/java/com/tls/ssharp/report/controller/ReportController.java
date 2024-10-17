package com.tls.ssharp.report.controller;

import com.tls.ssharp.auth.common.dto.CommonApiResponse;
import com.tls.ssharp.report.domain.Report;
import com.tls.ssharp.report.domain.ReportType;
import com.tls.ssharp.report.domain.dto.ReportApiReponse;
import com.tls.ssharp.report.domain.dto.ReportApiRequest;
import com.tls.ssharp.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class ReportController {

  private final ReportService reportService;

  @PostMapping("/posts/{postId}/report")
  public CommonApiResponse createReport(final @RequestBody ReportApiRequest dto) {
    reportService.saveReport(dto);
    return CommonApiResponse.createNoContent("성공!!");
  }

  @GetMapping("/reports")
  public ResponseEntity<String> getAllReport(@RequestParam(value = "page", required = false, defaultValue = "0") String page,
                                             @RequestParam(value = "size", required = false, defaultValue = "50") String size) {

    int pageNumber = Integer.parseInt(page);
    int pageSize = Integer.parseInt(size);

    if (pageNumber > 0) pageNumber--;

    Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("id").descending());
    Page<Report> allReport = reportService.findAllReport(pageable);

    if (!allReport.hasContent()) return ResponseEntity.noContent().build();

    return ResponseEntity.status(HttpStatus.OK).body(allReport.getContent().toString());
  }

  @GetMapping("/post/{postId}/reports")
  public ResponseEntity<List<ReportApiReponse>> getAllReports(@PathVariable(value = "postId", required = false) Long postId,
                                                              @RequestParam(value = "page", required = false, defaultValue = "0") String page,
                                                              @RequestParam(value = "size", required = false, defaultValue = "50") String size) {

    int pageNumber = Integer.parseInt(page);
    int pageSize = Integer.parseInt(size);

    if (pageNumber > 0) pageNumber--;

    PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by("id").descending());
    List<ReportApiReponse> list = reportService.findReportByPostId(postId, pageRequest);

    return ResponseEntity.status(HttpStatus.OK).body(list);
  }


}
