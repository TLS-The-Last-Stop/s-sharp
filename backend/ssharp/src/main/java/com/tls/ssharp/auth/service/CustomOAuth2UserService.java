// src/main/java/com/tls/ssharp/auth/service/CustomOAuth2UserService.java
package com.tls.ssharp.auth.service;

import com.tls.ssharp.user.entity.User;
import com.tls.ssharp.user.entity.UserPrincipal;
import com.tls.ssharp.user.profileImage.entity.ProfileImage;
import com.tls.ssharp.user.profileImage.repository.ProfileImageRepository;
import com.tls.ssharp.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.*;
import org.springframework.security.oauth2.core.*;
import org.springframework.security.oauth2.core.user.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

  private final UserRepository userRepository;
  private final ProfileImageRepository profileImageRepository;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate =
            new DefaultOAuth2UserService();
    OAuth2User oAuth2User = delegate.loadUser(userRequest);

    String registrationId = userRequest.getClientRegistration().getRegistrationId();
    String email = null;
    String name = null;

    if ("google".equals(registrationId)) {
      System.out.println("구글 로그인");
      email = oAuth2User.getAttribute("email");
      name = oAuth2User.getAttribute("name");
    } else if ("kakao".equals(registrationId)) {
      Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");
      if (kakaoAccount != null) {
        email = (String) kakaoAccount.get("email");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        if (profile != null) {
          name = (String) profile.get("nickname");
        }
      }
    } else if ("naver".equals(registrationId)) {
      Map<String, Object> response = oAuth2User.getAttribute("response");
      if (response != null) {
        email = (String) response.get("email");
        name = (String) response.get("name");
      }
    }

    if (email != null) {
      Optional<User> userOptional = userRepository.findByEmail(email);
      User user;
      if (userOptional.isPresent()) {
        user = userOptional.get();
      } else {


        System.out.println(oAuth2User.getName());
        user = User.builder()
                .email(email)
                .username(name)
                .provider(registrationId.toUpperCase())
                .providerId(oAuth2User.getName())
                .roles(Set.of("ROLE_USER"))
                .build();
        userRepository.save(user);
      }
      return UserPrincipal.create(user);
    }

    throw new OAuth2AuthenticationException(new OAuth2Error("맞지 않는 유저입니다"), "이메일을 찾을 수 없습니다.");
  }
}
