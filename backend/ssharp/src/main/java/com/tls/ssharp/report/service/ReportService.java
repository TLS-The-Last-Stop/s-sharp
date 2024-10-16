package com.tls.ssharp.report.service;

import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.post.repository.PostRepository;
import com.tls.ssharp.report.domain.Report;
import com.tls.ssharp.report.domain.dto.ReportApiReponse;
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

  public void saveReport(final ReportApiRequest dto) {
    UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    Post post = postRepository.findById(dto.getPostId()).orElseThrow();
    User user = userRepository.findByEmail(principal.getEmail()).orElseThrow();

    Report report = ReportApiRequest.toEntity(dto, user, post);

    reportRepository.save(report);
  }


  @Transactional(readOnly = true)
  public Page<Report> findAllReport(Pageable pageable) {
    return reportRepository.findAll(pageable);
  }

  @Transactional(readOnly = true)
  public List<ReportApiReponse> findReportByPostId(Long postId, Pageable pageable) {

    List<Report> report = reportRepository.findByPostId(postId);
    List<ReportApiReponse> allRerportByPostId = new ArrayList<>();
    for (Report r : report) {
      allRerportByPostId.add(ReportApiReponse.fromEntity(r, r.getPost().getUser()));
    }

    return allRerportByPostId;
  }

  public boolean isReportedBy(Long postId, Long reportUserId) {
    Optional<Report> report = reportRepository.findByPostIdAndReportUserId(postId, reportUserId);
    return report.isPresent();
  }


}
