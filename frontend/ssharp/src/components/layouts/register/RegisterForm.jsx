import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  // 입력 값을 상태로 관리
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  // 회원가입 처리 함수
  const handleRegister = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!termsAgreed) {
      alert('약관에 동의해야 합니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        name,
        email,
        password,
      });

      alert(response.data); // 서버 응답 메시지 표시
      window.location.href = '/login'; // 성공 시 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className='page-wrapper single'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 col-xl-6'>
            <div className='login-form'>
              <div className='form-header'>
                <h2 className='font-weight-bold mb-3'>회원가입</h2>

                <div className='info'>
                  <span>이미 회원이신가요?</span>
                  <Link to='/login' className='text-decoration-underline'>
                    로그인
                  </Link>
                </div>
              </div>

              <form className='login login-register-form' method='post' onSubmit={handleRegister}>
                <div className='form-row'>
                  <label>
                    이름&nbsp;<span className='required'>*</span>
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Username'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

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
                  <label>
                    비밀번호 확인&nbsp;<span className='required'>*</span>
                  </label>
                  <input
                    className='form-control'
                    type='password'
                    placeholder='Re-Enter Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className='form-row py-2'>
                  <input
                    type='checkbox'
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                  />{' '}
                  <span>
                    가입 시, 서비스 이용약관, 개인정보처리 방침에 동의합니다.
                  </span>
                </div>

                <div className='form-row'>
                  <button type='submit'>가입하기</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
