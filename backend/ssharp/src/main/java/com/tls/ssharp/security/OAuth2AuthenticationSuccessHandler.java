package com.tls.ssharp.security;

import com.tls.ssharp.auth.service.RefreshTokenService;
import com.tls.ssharp.user.entity.User;
import com.tls.ssharp.user.entity.UserPrincipal;
import com.tls.ssharp.user.repository.UserRepository;
import com.tls.ssharp.util.CookieUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final JwtTokenProvider jwtTokenProvider;
  private final RefreshTokenService refreshTokenService;
  private final UserRepository userRepository;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    String email = userPrincipal.getEmail();

    String jwt = jwtTokenProvider.generateToken(email);

    User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    String refreshToken = refreshTokenService.createRefreshToken(user.getId());

    Cookie accessTokenCookie = CookieUtil.createAccessTokenCookie(jwt);
    Cookie refreshTokenCookie = CookieUtil.createRefreshTokenCookie(refreshToken);

    response.addCookie(accessTokenCookie);
    response.addCookie(refreshTokenCookie);

    response.sendRedirect("http://localhost:5173/oauth2/redirect");
  }


}
