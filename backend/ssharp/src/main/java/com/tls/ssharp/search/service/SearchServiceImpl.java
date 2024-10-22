package com.tls.ssharp.search.service;

import com.tls.ssharp.review.entity.Review;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

@Service
public class SearchServiceImpl implements SearchService {

  @PersistenceContext
  private EntityManager em;



  @Override
  public List<Review> searchKeyword(String SearchKeyword, String searchContent) {
    System.out.println("@SearchKeyword:: " + SearchKeyword);
    System.out.println("@searchContent:: " + searchContent);
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<Review> query = cb.createQuery(Review.class);
    Root<Review> root = query.from(Review.class);// 포스트로 수정 예정

    Path<String> path = root.get(SearchKeyword);
    Predicate predicate = cb.like(path, "%" + searchContent + "%");
    query.select(root).where(predicate);
    return em.createQuery(query).getResultList();
  }
}
