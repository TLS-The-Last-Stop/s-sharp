package com.tls.ssharp.post.entity;

import com.tls.ssharp.auth.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "tags")
public class Tag extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 50, nullable = false, unique = true)
  private String name;

  @ManyToMany(mappedBy = "tags")
  private List<Post> posts;
}