package com.tls.ssharp.report.repository;

import com.tls.ssharp.report.domain.Report;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {
  List<Report> findByPostId(Long postId);

  Optional<Report> findByPostIdAndReportUserId(@Param("postId") Long postId, @Param("userId") Long userId);
}
