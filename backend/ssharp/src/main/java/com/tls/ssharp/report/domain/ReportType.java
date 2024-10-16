package com.tls.ssharp.report.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public enum ReportType {
  R1("음란물"), R2("홍보"), R3("혐오발언"), R4("정치질"), R5("기타사유");

  private final String description;

  ReportType(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

  @JsonCreator
  public static ReportType fromDescription(@JsonProperty("reportType") String description) {
    System.out.println("=> " + description);
    for (ReportType type : ReportType.values()) {
      if (type.getDescription().equals(description)) return type;
    }
    throw new IllegalArgumentException("Unkown report type: " + description);
  }
}
