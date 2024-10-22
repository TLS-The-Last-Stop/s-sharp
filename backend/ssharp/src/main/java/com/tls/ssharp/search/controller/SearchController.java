package com.tls.ssharp.search.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tls.ssharp.review.entity.Review;
import com.tls.ssharp.search.repository.SearchRepository;
import com.tls.ssharp.search.service.SearchService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin("*")
@RequiredArgsConstructor
public class SearchController {

  private final SearchService searchService;
  private final SearchRepository searchRepository;

  @PostMapping("/boardSearch")
  public @ResponseBody List<Review> getList(@RequestBody String searchContentori){
    System.out.println("@searchContent:" + searchContentori);
    List<Review> list = null;
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      JsonNode jsonNode = objectMapper.readTree(searchContentori);

      String searchContent = jsonNode.get("searchContent").asText();
      String searchKeyword = jsonNode.get("SearchKeyword").asText();
      if(searchKeyword.equals("all")){
        List<Review> all = searchRepository.findAll();
        for(Review a : all){
          System.out.println("review시작: " + a );
        }
        return all;
      }
      System.out.println("searchContent: " + searchContent);
      System.out.println("SearchKeyword: " + searchKeyword);
      list = searchService.searchKeyword(searchKeyword, searchContent);
      for(Review review : list){
        System.out.println("review시작: " + review);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    return list;
  }
}
