package com.tls.ssharp.report.service;

import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.post.repository.PostRepository;
import com.tls.ssharp.report.domain.Report;
import com.tls.ssharp.report.domain.dto.ReportApiResponse;
import com.tls.ssharp.report.domain.dto.ReportApiRequest;
import com.tls.ssharp.report.repository.ReportRepository;
import com.tls.ssharp.user.entity.User;
import com.tls.ssharp.user.entity.UserPrincipal;
import com.tls.ssharp.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ReportService {

  private final ReportRepository reportRepository;
  private final PostRepository postRepository;
  private final UserRepository userRepository;

  public void saveReport(final ReportApiRequest dto, Authentication auth) {

    Post post = postRepository.findById(dto.getPostId()).orElseThrow();

    UserPrincipal principal = (UserPrincipal) auth.getPrincipal();
    User user = userRepository.findByEmail(principal.getEmail()).orElseThrow();

    Report report = ReportApiRequest.toEntity(dto, user, post);

    reportRepository.save(report);
  }


/*  @Transactional(readOnly = true)
  public Page<Report> findAllReport(Pageable pageable) {
    return reportRepository.findAll(pageable);
  }*/

  @Transactional(readOnly = true)
  public Page<ReportApiResponse> findReportsBySearch(Pageable pageable, String searchType, String keyword) {
    Page<Report> reports = reportRepository.findReportsBySearchConditions(searchType, keyword, pageable);

    return reports.map(report -> ReportApiResponse.fromEntity(report, report.getReportUser()));
  }

  @Transactional(readOnly = true)
  public List<ReportApiResponse> findReportByPostId(Long postId, Pageable pageable) {

    List<Report> report = reportRepository.findByPostId(postId);
    List<ReportApiResponse> allRerportByPostId = new ArrayList<>();
    for (Report r : report) {
      allRerportByPostId.add(ReportApiResponse.fromEntity(r, r.getPost().getUser()));
    }

    return allRerportByPostId;
  }

  public boolean isReportedBy(Long postId, Long reportUserId) {
    Optional<Report> report = reportRepository.findByPostIdAndReportUserId(postId, reportUserId);
    return report.isPresent();
  }


}
