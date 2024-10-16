package com.tls.ssharp.user.entity;

import com.tls.ssharp.auth.common.entity.BaseEntity;
import com.tls.ssharp.user.profileImage.entity.ProfileImage;
import lombok.*;
import jakarta.persistence.*;

import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"provider", "providerId"})
})
public class User extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "profile_image_id")
  private ProfileImage profileImage;

  @Column(length = 50, nullable = false)
  private String username;

  @Column(length = 100, nullable = false, unique = true)
  private String email;

  @Column(length = 100, nullable = true) // unique=true 제거, nullable=true로 변경
  private String password;

  @Column(length = 100)
  private String nickname;

  @Column(columnDefinition = "TEXT")
  private String bio;

  @Column(name = "is_deleted")
  private Boolean isDeleted;

//  @OneToMany(mappedBy = "user")
//  private List<Post> posts;
//
//  @OneToMany(mappedBy = "user")
//  private List<Review> reviews;
//
//  @OneToMany(mappedBy = "user")
//  private List<Bookmark> bookmarks;
//
//  @OneToMany(mappedBy = "user")
//  private List<View> views;
//
//  @OneToMany(mappedBy = "user")
//  private List<Report> reports;
//
//  @OneToMany(mappedBy = "user")
//  private List<Notification> notifications;

  // 제공자 정보
  @Column(nullable = false)
  private String provider;

  @Column(nullable = false, unique = true)
  private String providerId;

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> roles;
}
