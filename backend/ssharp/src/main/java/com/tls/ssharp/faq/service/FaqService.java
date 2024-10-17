package com.tls.ssharp.faq.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tls.ssharp.faq.domain.Faq;
import com.tls.ssharp.faq.domain.FaqData;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FaqService {
  private static final String FAQ_KEY = "faq";
  private static final String VIEW_KEY = "faq:views";

  private final RedisTemplate<String, Faq> redisTemplate;
  private final ObjectMapper mapper;

  @PostConstruct
  public void initializeFaqData() {
    mapper.configure(DeserializationFeature.USE_LONG_FOR_INTS, true);
    Resource resource = new ClassPathResource("FaqData.json");

    try {
      FaqData faqData = mapper.readValue(resource.getInputStream(), FaqData.class);

      for (Faq faq : faqData.getFaqData())
        redisTemplate.opsForHash().put("faq", faq.id().toString(), faq);

    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public List<Faq> findAllFaq() {
    return redisTemplate.opsForHash().values("faq")
            .stream()
            .map(obj -> mapper.convertValue(obj, Faq.class))
            .sorted(Comparator.comparing(Faq::views).reversed())
            .collect(Collectors.toList());
  }

  public Faq getFaqAndIncrementViews(Long id) {
    String faqId = id.toString();
    Faq faq = (Faq) redisTemplate.opsForHash().get(FAQ_KEY, faqId);

    if (faq != null) {
      // 조회수 증가
      Faq updateFaq = new Faq(faq.id(), faq.question(), faq.answer(), faq.views() + 1);
      redisTemplate.opsForHash().put(FAQ_KEY, faqId, updateFaq);

      return updateFaq;
    }
    return null;
  }

}
