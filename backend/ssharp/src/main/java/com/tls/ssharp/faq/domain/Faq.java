package com.tls.ssharp.faq.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Faq(Long id, String question, String answer, Long views) implements Serializable {
}