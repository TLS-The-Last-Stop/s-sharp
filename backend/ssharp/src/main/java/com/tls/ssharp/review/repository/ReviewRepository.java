package com.tls.ssharp.review.repository;

import com.tls.ssharp.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewRepository extends JpaRepository<Review, Long> {


  @Query("SELECT SUM(r.rating) FROM Review r")
  double getSumOfRating();

  @Query("select count(r.id) from Review r")
  int getCountofId();
}
