package com.tls.ssharp.report.repository;

import com.tls.ssharp.report.domain.Report;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {
  List<Report> findByPostId(Long postId);

  Optional<Report> findByPostIdAndReportUserId(@Param("postId") Long postId, @Param("userId") Long userId);

  @Query("SELECT r FROM Report r " +
          "LEFT JOIN FETCH r.reportUser ru " +
          "LEFT JOIN FETCH r.post p " +
          "LEFT JOIN FETCH p.user pu " +
          "WHERE (:searchType = 'all' OR " +
          "       (:searchType = 'nickname' AND (LOWER(ru.nickname) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(pu.nickname) LIKE LOWER(CONCAT('%', :keyword, '%')))) OR " +
          "       (:searchType = 'title' AND LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%'))))")
  Page<Report> findReportsBySearchConditions(@Param("searchType") String searchType,
                                             @Param("keyword") String keyword,
                                             Pageable pageable);

}
