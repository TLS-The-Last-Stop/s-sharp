package com.tls.ssharp.util;

import jakarta.servlet.http.Cookie;

public class CookieUtil {

  public static Cookie createCookie(String name, String value, int maxAge, boolean httpOnly, boolean secure) {
    Cookie cookie = new Cookie(name, value);
    cookie.setHttpOnly(httpOnly);
    cookie.setSecure(secure);
    cookie.setPath("/");
    cookie.setMaxAge(maxAge);
    return cookie;
  }

  public static Cookie createAccessTokenCookie(String jwt) {
    return createCookie("accessToken", jwt, 24 * 60 * 60, false, false);
  }

  public static Cookie createRefreshTokenCookie(String refreshToken) {
    return createCookie("refreshToken", refreshToken, 30 * 24 * 60 * 60, false, false);
  }
}
