package com.tls.ssharp.post.entity;

import com.tls.ssharp.auth.common.entity.BaseEntity;
import com.tls.ssharp.post.dto.request.PostRequest;
import com.tls.ssharp.review.entity.Review;
import com.tls.ssharp.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "posts")
public class Post extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @Column(nullable = false)
  private String title;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String content;

  @Column(name = "is_published")
  private Boolean isPublished;

  @Column(name = "published_at")
  private LocalDateTime publishedAt;

  @Column(name = "is_deleted")
  private Boolean isDeleted;

//  @OneToMany(mappedBy = "post")
//  private List<Review> reviews;

//  @OneToMany(mappedBy = "post")
//  private List<Bookmark> bookmarks;
//
//  @OneToMany(mappedBy = "post")
//  private List<File> files;
}
