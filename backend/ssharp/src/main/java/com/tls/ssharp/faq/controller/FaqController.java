package com.tls.ssharp.faq.controller;

import com.tls.ssharp.auth.common.dto.CommonApiResponse;
import com.tls.ssharp.faq.domain.Faq;
import com.tls.ssharp.faq.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FaqController {

  private final FaqService faqService;

  @GetMapping("/faq")
  public CommonApiResponse<Faq> getAllFaqs() {
    List<Faq> list = faqService.findAllFaq();
    return null;
  }

}
