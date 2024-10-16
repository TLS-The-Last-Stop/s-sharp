package com.tls.ssharp.bookmark.entity;

import com.tls.ssharp.auth.common.entity.BaseEntity;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "bookmarks")
public class Bookmark extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "post_id")
  private Post post;
}
