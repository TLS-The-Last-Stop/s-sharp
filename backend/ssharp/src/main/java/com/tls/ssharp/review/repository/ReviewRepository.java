package com.tls.ssharp.review.repository;

import com.tls.ssharp.review.entity.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {


  @Query("SELECT SUM(r.rating) FROM Review r")
  double getSumOfRating();

  @Query("select count(r.id) from Review r")
  int getCountofId();

  @Query("SELECT r FROM Review r WHERE r.post.id = :postId")
  List<Review> findAllByPostId(@Param("postId") Long postId);}
