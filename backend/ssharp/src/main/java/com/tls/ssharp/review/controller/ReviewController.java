package com.tls.ssharp.review.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.post.repository.PostRepository;
import com.tls.ssharp.review.dto.request.ReviewDTO;
import com.tls.ssharp.review.entity.Review;
import com.tls.ssharp.review.repository.ReviewRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("review/")
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final PostRepository postRepository; // Post 엔티티를 조회하기 위한 리포지토리

    @PostMapping("write")
    public List<Review>  writeReview(@RequestBody ReviewDTO reviewDTO) {
        System.out.println(reviewDTO.getContent() + reviewDTO.getRating());
        // String substringContent = reviewDTO.getContent().substring(1, reviewDTO.getContent().length() - 1);
        System.out.println("@@reviewDTO.fetPOstID:  " +reviewDTO.getPostId());
        Optional<Post> post = postRepository.findById(reviewDTO.getPostId());
        Review review = new Review();
        review.setContent(reviewDTO.getContent());
        review.setRating(reviewDTO.getRating());
        review.setPost(post.get());
        reviewRepository.save(review);
        List<Review> list = reviewRepository.findAllByPostId(reviewDTO.getPostId());
        if (list == null) {
            System.out.println("라이트에서 널");
        }
        for (Review review2 : list) {
            System.out.println("@foreach1: " + review2.getContent());
        }
        return list;
    }
    @GetMapping("getList")
    @ResponseBody
    public List<Review> getReviewList(Long postId) {
        System.out.println("@getReviewList 찍음");
        System.out.println("@List PostId:  " +postId);
        List<Review> list = reviewRepository.findAllByPostId(postId);
        if (list == null) {
            System.out.println("리스트에서 널");
        }

        System.out.println("@List PostId:  " +postId);
        return list;
    }
    @GetMapping("getAvg")
    public int getRateAvg(){
        double sumOfRating = reviewRepository.getSumOfRating();
        int count = reviewRepository.getCountofId();
        double avg = sumOfRating/count;
        System.out.println("@getAvg  " + Math.round(avg * 10.0) / 10.0 );
        return (int)Math.round(avg * 10) / 10;
    }


}
