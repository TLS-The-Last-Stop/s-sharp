package com.tls.ssharp.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

  @Bean
  public OpenAPI springVelogCloneOpenAPI() {
    return new OpenAPI()
            .info(new Info().title("S-S#arp Web Api")
                    .description("학생 학습정리 플랫폼을 위한 API 문서")
                    .version("v1.0.0"))
            .externalDocs(new ExternalDocumentation()
                    .description("S-S#arp 깃허브 URL")
                    .url("https://github.com/나중에 ~"));
  }
}
