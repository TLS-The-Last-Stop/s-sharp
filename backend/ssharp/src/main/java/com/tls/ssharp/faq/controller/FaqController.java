package com.tls.ssharp.faq.controller;

import com.tls.ssharp.auth.common.dto.CommonApiResponse;
import com.tls.ssharp.faq.domain.Faq;
import com.tls.ssharp.faq.service.FaqService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/faq")
@Slf4j
public class FaqController {

  private final FaqService faqService;

  @GetMapping
  public CommonApiResponse<?> getAllFaq() {
    List<Faq> allFaq = faqService.findAllFaq();
    return CommonApiResponse.createCreated("all faq", allFaq);
  }

  @GetMapping("/{id}")
  public CommonApiResponse<?> getFaq(@PathVariable Long id) {
    Faq faq = faqService.getFaqAndIncrementViews(id);
    log.info("faq views {} {} ",faq.question(),faq.views());

    if(faq != null) return CommonApiResponse.createCreated("해당 질문", faq);
    return CommonApiResponse.createBadRequest("해당 질문이 없습니다.");
  }

}
