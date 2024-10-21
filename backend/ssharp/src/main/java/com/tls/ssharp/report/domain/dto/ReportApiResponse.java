package com.tls.ssharp.report.domain.dto;

import com.tls.ssharp.report.domain.Report;
import com.tls.ssharp.report.domain.ReportStatus;
import com.tls.ssharp.report.domain.ReportType;
import com.tls.ssharp.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportApiResponse {

  private Long id;
  private Long postId;
  private String title;
  private String postUserNickname;
  private String reportUserNickname;
  private String reason;
  private ReportType reportType;
  private ReportStatus reportStatus;
  private LocalDateTime createdAt;

  public static ReportApiResponse fromEntity(Report report) {
    return ReportApiResponse.builder()
            .id(report.getId())
            .postId(report.getPost().getId())
            .title(report.getPost().getTitle())
            .postUserNickname(report.getPost().getUser().getUsername())
            .reportUserNickname(report.getReportUser().getUsername())
            .reason(report.getReason())
            .reportType(report.getReportType())
            .reportStatus(report.getReportStatus())
            .createdAt(report.getCreatedAt())
            .build();
  }

}
