package com.tls.ssharp.report.domain.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.report.domain.*;
import com.tls.ssharp.user.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReportApiRequest {
  private Long postId;
  private String reason;

  @JsonDeserialize(using = ReportTypeDeserializer.class)
  private ReportType reportType;

  public static Report toEntity(ReportApiRequest dto, User reportUser, Post post) {
    return Report.builder()
            .reportUser(reportUser)
            .post(post)
            .reason(dto.getReason())
            .reportType(dto.getReportType())
            .reportStatus(ReportStatus.CHECKING)
            .build();
  }


}
