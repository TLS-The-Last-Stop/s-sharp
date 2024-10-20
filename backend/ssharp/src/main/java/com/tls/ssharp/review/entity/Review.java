package com.tls.ssharp.review.entity;

import com.tls.ssharp.auth.common.entity.BaseEntity;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "review")
public class Review extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "post_id")
  private Post post;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String content;

  private int rating;
  @Column(name = "is_deleted")
  private Boolean isDeleted;
}



