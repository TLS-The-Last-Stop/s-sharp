package com.tls.ssharp.search.service;

import com.tls.ssharp.review.entity.Review;
import java.util.List;


public interface SearchService {
  public List<Review> searchKeyword(String SearchKeyword ,String searchContent);


  }
