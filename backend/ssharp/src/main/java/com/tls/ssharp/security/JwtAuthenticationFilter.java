package com.tls.ssharp.security;

import com.tls.ssharp.auth.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtTokenProvider jwtTokenProvider;
  private final CustomUserDetailsService customUserDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
    String token = getJwtFromRequest(request);

    if (token != null) {
      System.out.println("JWT Token Found: " + token);
    }

    if (token != null && jwtTokenProvider.validateToken(token)) {
      System.out.println("JWT Token is valid");
      String email = jwtTokenProvider.getUserEmailFromJWT(token);
      System.out.println("Email from JWT: " + email);

      UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
      UsernamePasswordAuthenticationToken authentication =
              new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

      System.out.println("Setting SecurityContext with Authentication for: " + email);
      SecurityContextHolder.getContext().setAuthentication(authentication);
    } else {
      System.out.println("JWT Token is invalid or not present");
    }

    filterChain.doFilter(request, response);
  }

  private String getJwtFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }
}
