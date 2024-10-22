package com.tls.ssharp.report.domain.dto;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.tls.ssharp.report.domain.ReportType;

import java.io.IOException;

public class ReportTypeDeserializer extends JsonDeserializer {
  @Override
  public Object deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
    String value = jsonParser.getValueAsString();
    return ReportType.fromDescription(value);
  }
}
