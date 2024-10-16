package com.tls.ssharp.review.service.impl;

import com.tls.ssharp.review.repository.ReviewRepository;
import com.tls.ssharp.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

  private final ReviewRepository reviewRepository;

}
