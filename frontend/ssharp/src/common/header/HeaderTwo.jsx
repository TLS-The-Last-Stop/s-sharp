import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Cookies from 'js-cookie';

const HeaderTwo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'));
  const navigate = useNavigate();

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    Cookies.remove('refreshToken');
    Cookies.remove('accessToken');
    setAccessToken(null);
    navigate('/');
  };

  useEffect(() => {
    const token = Cookies.get('accessToken');
    setAccessToken(token);
  }, []);

  return (
      <header className='header-style-1'>
        <div className={`header-navbar navbar-sticky ${windowWidth <= 991 ? 'mobile-menu' : ''}`}>
          <div className='container'>
            <div className='d-flex align-items-center justify-content-between'>
              <div className='site-logo'>
                <Link to='/'>
                  <img
                      src={`${import.meta.env.VITE_API_URL}/assets/images/logo.png`}
                      alt='Course Thumb'
                      className='img-fluid'
                  />
                </Link>
              </div>

              <div className='offcanvas-icon d-block d-lg-none'>
                <a href='#' onClick={openMenu} className='nav-toggler'>
                  <i className='fal fa-bars'></i>
                </a>
              </div>

              <nav className={`site-navbar ms-auto ${isMenuOpen ? 'menu-on' : ''}`}>
                <Nav />
                {isMenuOpen && (
                    <a href='#' onClick={closeMenu} className='nav-close'>
                      <i className='fal fa-times'></i>
                    </a>
                )}
              </nav>

              <div className='header-btn d-none d-xl-block'>
                {accessToken ? (
                    <button onClick={handleLogout} className='btn btn-main-2 btn-sm-2 rounded' type='button'>
                      로그아웃
                    </button>
                ) : (
                    <>
                      <Link to='/login' className='login'>
                        로그인
                      </Link>
                      <Link to='/register' className='btn btn-main-2 btn-sm-2 rounded'>
                        회원가입
                      </Link>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
  );
};

export default HeaderTwo;
