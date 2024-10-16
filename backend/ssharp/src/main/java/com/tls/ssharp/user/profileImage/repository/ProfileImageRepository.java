package com.tls.ssharp.user.profileImage.repository;

import com.tls.ssharp.user.profileImage.entity.ProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long> {
}
