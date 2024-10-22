package com.tls.ssharp.report.domain;

import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Report {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "user_id", nullable = false, updatable = false)
  private User reportUser;

  @JoinColumn(name = "post_id", nullable = false, updatable = false)
  @ManyToOne(fetch = LAZY)
  private Post post;

  @Column(nullable = false)
  private String reason;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private ReportType reportType;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false)
  private ReportStatus reportStatus;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate
  @Column(insertable = false)
  private LocalDateTime updatedAt;

}
