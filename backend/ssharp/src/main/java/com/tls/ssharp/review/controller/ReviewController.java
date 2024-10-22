package com.tls.ssharp.review.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tls.ssharp.post.entity.Post;
import com.tls.ssharp.post.repository.PostRepository;
import com.tls.ssharp.review.dto.request.ReviewDTO;
import com.tls.ssharp.review.dto.response.ReviewResponseDTO;
import com.tls.ssharp.review.dto.response.UserDTO;
import com.tls.ssharp.review.entity.Review;
import com.tls.ssharp.review.repository.ReviewRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.tls.ssharp.user.entity.User;
import com.tls.ssharp.user.entity.UserPrincipal;
import com.tls.ssharp.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("review/")
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final PostRepository postRepository; // Post 엔티티를 조회하기 위한 리포지토리
    private final UserRepository userRepository;

    @PostMapping("write")
    public List<ReviewResponseDTO> writeReview(@RequestBody ReviewDTO reviewDTO, Authentication authentication) {
        Optional<Post> post = postRepository.findById(reviewDTO.getPostId());
        Long userId = ((UserPrincipal) authentication.getPrincipal()).getId();

        Review review = new Review();
        review.setUser(userRepository.getReferenceById(userId));
        review.setContent(reviewDTO.getContent());
        review.setRating(reviewDTO.getRating());
        review.setPost(post.get());
        reviewRepository.save(review);

        List<Review> reviews = reviewRepository.findAllByPostId(reviewDTO.getPostId());
        return reviews.stream()
                .map(r -> new ReviewResponseDTO(r.getId(), r.getContent(), r.getRating(), new UserDTO(r.getUser().getId(), r.getUser().getUsername())))
                .collect(Collectors.toList());
    }

    @GetMapping("getList")
    public List<ReviewResponseDTO> getReviewList(Long postId) {
        List<Review> reviews = reviewRepository.findAllByPostId(postId);
        return reviews.stream()
                .map(r -> new ReviewResponseDTO(r.getId(), r.getContent(), r.getRating(), new UserDTO(r.getUser().getId(), r.getUser().getUsername())))
                .collect(Collectors.toList());
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
