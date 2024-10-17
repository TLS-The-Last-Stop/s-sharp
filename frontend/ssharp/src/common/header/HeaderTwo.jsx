import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const HeaderTwo = () => {
  if (window.location.pathname === '../pages/write.jsp') return null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className='header-style-1'>
        <div
          className={`header-navbar navbar-sticky ${
            windowWidth <= 991 ? 'mobile-menu' : ''
          }`}
        >
          <div className='container'>
            <div className='d-flex align-items-center justify-content-between'>
              <div className='site-logo'>
                <Link to='/'>
                  <img
                    src={`${
                      import.meta.env.VITE_API_URL
                    }/assets/images/logo.png`}
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

              <nav
                className={`site-navbar ms-auto ${isMenuOpen ? 'menu-on' : ''}`}
              >
                <Nav />

                {isMenuOpen && (
                  <a href='#' onClick={closeMenu} className='nav-close'>
                    <i className='fal fa-times'></i>
                  </a>
                )}
              </nav>

              <div className='header-btn d-none d-xl-block'>
                <Link to='/login' className='login'>
                  Login
                </Link>
                <Link
                  to='/register'
                  className='btn btn-main-2 btn-sm-2 rounded'
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderTwo;
