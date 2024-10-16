package com.tls.ssharp.review.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tls.ssharp.review.dto.request.ReviewDTO;
import com.tls.ssharp.review.entity.Review;
import com.tls.ssharp.review.repository.ReviewRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("review/")
public class ReviewController {
    private final ReviewRepository reviewRepository;

    @PostMapping("write")
    public List<Review>  writeReview(@RequestBody ReviewDTO reviewDTO) {
        System.out.println(reviewDTO.getContent() + reviewDTO.getRating());
       // String substringContent = reviewDTO.getContent().substring(1, reviewDTO.getContent().length() - 1);
        Review review = new Review();
        review.setContent(reviewDTO.getContent());
        review.setRating(reviewDTO.getRating());
        reviewRepository.save(review);
        return reviewRepository.findAll();
    }
    @GetMapping("getList")
    @ResponseBody
    public List<Review> getReviewList() {
        System.out.println("@getReviewList 찍음");
        reviewRepository.findAll().forEach(System.out::println);
        return reviewRepository.findAll();
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
