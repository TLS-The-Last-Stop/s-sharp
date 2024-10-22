package com.tls.ssharp.search.repository;

import com.tls.ssharp.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchRepository extends JpaRepository<Review,Long> {

}
