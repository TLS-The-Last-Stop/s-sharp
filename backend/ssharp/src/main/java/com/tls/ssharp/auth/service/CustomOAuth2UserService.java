package com.tls.ssharp.auth.service;

import com.tls.ssharp.user.entity.User;
import com.tls.ssharp.user.entity.UserPrincipal;
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

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = loadOAuth2User(userRequest);
    String registrationId = userRequest.getClientRegistration().getRegistrationId();

    String email = extractEmail(oAuth2User, registrationId);
    String name = extractName(oAuth2User, registrationId);

    if (email != null) {
      User user = handleUser(email, name, registrationId, oAuth2User);
      return UserPrincipal.create(user);
    }

    throw new OAuth2AuthenticationException(new OAuth2Error("invalid_user"), "이메일을 찾을 수 없습니다.");
  }

  private OAuth2User loadOAuth2User(OAuth2UserRequest userRequest) {
    OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
    return delegate.loadUser(userRequest);
  }

  private String extractEmail(OAuth2User oAuth2User, String registrationId) {
    if ("google".equals(registrationId)) {
      return oAuth2User.getAttribute("email");
    } else if ("kakao".equals(registrationId)) {
      Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");
      if (kakaoAccount != null) {
        return (String) kakaoAccount.get("email");
      }
    } else if ("naver".equals(registrationId)) {
      Map<String, Object> response = oAuth2User.getAttribute("response");
      if (response != null) {
        return (String) response.get("email");
      }
    }
    return null;
  }

  private String extractName(OAuth2User oAuth2User, String registrationId) {
    if ("google".equals(registrationId)) {
      return oAuth2User.getAttribute("name");
    } else if ("kakao".equals(registrationId)) {
      Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");
      if (kakaoAccount != null) {
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        if (profile != null) {
          return (String) profile.get("nickname");
        }
      }
    } else if ("naver".equals(registrationId)) {
      Map<String, Object> response = oAuth2User.getAttribute("response");
      if (response != null) {
        return (String) response.get("name");
      }
    }
    return null;
  }

  private User handleUser(String email, String name, String registrationId, OAuth2User oAuth2User) {
    Optional<User> userOptional = userRepository.findByEmail(email);
    if (userOptional.isPresent()) {
      return userOptional.get();
    } else {
      User newUser = User.builder()
              .email(email)
              .username(name)
              .provider(registrationId.toUpperCase())
              .providerId(oAuth2User.getName())
              .roles(Set.of("ROLE_USER"))
              .build();
      return userRepository.save(newUser);
    }
  }
}
