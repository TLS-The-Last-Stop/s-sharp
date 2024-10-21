import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../app/css/LoginForm.css';
import kakaoIcon from '../../../app/assets/images/icon/kakao_s.png';
import naverIcon from '../../../app/assets/images/icon/naver_s.png';
import googleIcon from '../../../app/assets/images/icon/google_s.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirectUri = encodeURIComponent('http://localhost:5137');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 로그인 요청a
      await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      }, { withCredentials: true });  // 쿠키 포함 요청

      // 홈 페이지로 리다이렉트
      window.location.href = '/';
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
  };

  return (
    <section className='page-wrapper single'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 col-xl-6'>
            <div className='login-form'>
              <div className='form-header'>
                <h2 className='font-weight-bold mb-3'>로그인</h2>

                <div className='info'>
                  <span>아직 가입 안하셨나요? </span>
                  <Link to='/register' className='text-decoration-underline'>
                    회원가입
                  </Link>
                </div>
              </div>

              <form className='login login-register-form' method='post' onSubmit={handleLogin}>
                <div className='form-row'>
                  <label>
                    이메일&nbsp;<span className='required'>*</span>
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className='form-row'>
                  <label>
                    비밀번호&nbsp;<span className='required'>*</span>
                  </label>
                  <input
                    className='form-control'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className='form-row'>
                  <button type='submit' className='btn btn-warning login-button'>
                    로그인
                  </button>
                </div>
              </form>

              <div className='social-login-buttons'>
                <img
                  src={kakaoIcon}
                  alt='Kakao Login'
                  onClick={handleKakaoLogin}
                  className='social-login-btn'
                />
                <img
                  src={naverIcon}
                  alt='Naver Login'
                  onClick={handleNaverLogin}
                  className='social-login-btn'
                />
                <img
                  src={googleIcon}
                  alt='Google Login'
                  onClick={handleGoogleLogin}
                  className='social-login-btn'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
