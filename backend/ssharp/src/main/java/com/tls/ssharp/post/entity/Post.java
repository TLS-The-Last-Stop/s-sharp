package com.tls.ssharp.post.entity;

import com.tls.ssharp.auth.common.entity.BaseEntity;
import com.tls.ssharp.bookmark.entity.Bookmark;
import com.tls.ssharp.post.dto.request.PostRequest;
import com.tls.ssharp.review.entity.Review;
import com.tls.ssharp.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

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

  @Column(name = "is_deleted")
  private Boolean isDeleted;

  @ManyToMany
  @JoinTable(
          name = "post_tags",
          joinColumns = @JoinColumn(name = "post_id"),
          inverseJoinColumns = @JoinColumn(name = "tag_id")
  )
  private List<Tag> tags;

  @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
  private List<Review> reviews;

  @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
  private List<Bookmark> bookmarks;
//
//  @OneToMany(mappedBy = "post")
//  private List<File> files;
}
