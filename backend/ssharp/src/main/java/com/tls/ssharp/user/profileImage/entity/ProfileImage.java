package com.tls.ssharp.user.profileImage.entity;

import com.tls.ssharp.auth.common.entity.BaseEntity;
import com.tls.ssharp.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "profile_images")
public class ProfileImage extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "original_filename")
  private String originalFilename;

  @Column(name = "save_filename")
  private String saveFilename;

  @Column
  private String path;

  @Column(name = "is_deleted")
  private Boolean isDeleted;

  @OneToMany(mappedBy = "profileImage")
  private List<User> users;
}
