import React from 'react';
import { Link } from 'react-router-dom';

const FooterTwo = () => {
  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (window.location.pathname === '/write') {
    return null;
  }

  return (
      <>
        <section className='footer'>
          <div className='footer-mid'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-3 me-auto col-sm-8'>
                  <div className='footer-logo mb-3'>
                    <img
                        src={`${import.meta.env.VITE_API_URL}/assets/images/footer.png`}
                        alt='Logo'
                        className='img-fluid'
                    />
                  </div>
                  <div className='widget footer-widget mb-5 mb-lg-0'>
                    <p>
                      학생 학습 정리 플랫폼을 통해 학생들이 학습 내용을 정리하고 공유할 수 있는 공간을 제공합니다. 스스로 학습을 체계적으로 관리하고, 타인의 자료를 참고하여 학습의 질을 높입니다.
                    </p>
                  </div>
                </div>

                <div className='col-xl-2 col-sm-4'>
                  <div className='footer-widget mb-5 mb-xl-0'>
                    <h6 className='text-white'>전화번호</h6>
                    <p>01020241021</p>
                    <ul className='list-unstyled footer-links'>
                      <li>
                        <h6 className='text-white'>이메일</h6>
                        <Link to='ssharp@gmail.com'>ssharp@gmail.com</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='col-xl-2 col-sm-4'>
                  <div className='footer-widget mb-5 mb-xl-0'>
                    <h5 className='widget-title'>정보</h5>
                    <ul className='list-unstyled footer-links'>
                      <li>
                        <Link to='#'>이용약관</Link>
                      </li>
                      <li>
                        <Link to='#'>개인정보처리방침</Link>
                      </li>
                      <li>
                        <Link to='#'>서비스소개</Link>
                      </li>
                      <li>
                        <Link to='#'>광고상품 소개</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='footer-btm'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-xl-6 col-sm-12 col-lg-6'>
                  <p className='mb-0 copyright text-sm-center text-lg-start'>
                    © 2024 TLS. All rights reserved.
                  </p>
                </div>
                <div className='col-xl-6 col-sm-12 col-lg-6'>
                  <div className='footer-btm-links text-start text-sm-center text-lg-end'>
                    <Link to='#'>법적 고지</Link>
                    <Link to='#'>지원</Link>
                    <Link to='#'>약관</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='fixed-btm-top' onClick={moveToTop}>
            <Link to='#top-header' className='js-scroll-trigger scroll-to-top'>
              <i className='fa fa-angle-up'></i>
            </Link>
          </div>
        </section>
      </>
  );
};

export default FooterTwo;
