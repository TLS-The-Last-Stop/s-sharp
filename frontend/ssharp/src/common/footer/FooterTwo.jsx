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
                    src='assets/images/logo-white.png'
                    alt=''
                    className='img-fluid'
                  />
                </div>
                <div className='widget footer-widget mb-5 mb-lg-0'>
                  <p>
                    Edumel is a Bootstrap Template for online courses education
                    websites support multiple courses
                  </p>
                </div>
              </div>

              <div className='col-xl-2 col-sm-4'>
                <div className='footer-widget mb-5 mb-xl-0'>
                  <h5 className='widget-title'>Explore</h5>
                  <ul className='list-unstyled footer-links'>
                    <li>
                      <Link to='#'>About us</Link>
                    </li>
                    <li>
                      <Link to='#'>Contact us</Link>
                    </li>
                    <li>
                      <Link to='#'>Services</Link>
                    </li>
                    <li>
                      <Link to='#'>Support</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='col-xl-2 col-sm-4'>
                <div className='footer-widget mb-5 mb-xl-0'>
                  <h5 className='widget-title '>Categories</h5>
                  <ul className='list-unstyled footer-links'>
                    <li>
                      <Link to='#'>SEO Business</Link>
                    </li>
                    <li>
                      <Link to='#'>Digital Marketing</Link>
                    </li>
                    <li>
                      <Link to='#'>Graphic Design</Link>
                    </li>
                    <li>
                      <Link to='#'>Social Marketing</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='col-xl-2 col-sm-4'>
                <div className='footer-widget mb-5 mb-xl-0'>
                  <h5 className='widget-title'>Links</h5>
                  <ul className='list-unstyled footer-links'>
                    <li>
                      <Link to='#'>News & Blogs</Link>
                    </li>
                    <li>
                      <Link to='#'>Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to='#'>Support</Link>
                    </li>
                    <li>
                      <Link to='#'>Return Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='col-xl-2 col-sm-4'>
                <div className='footer-widget mb-5 mb-xl-0'>
                  <h5 className='widget-title'>Address</h5>
                  <ul className='list-unstyled footer-links'>
                    <li>
                      <h6 className='text-white'>Phone</h6>
                      <Link to='#'>+0800 327 8534</Link>
                    </li>
                    <li>
                      <h6 className='text-white'>Email</h6>
                      <Link to='#'>support@tutori.com</Link>
                    </li>
                  </ul>
                  <div className='footer-socials mt-4'>
                    <Link to='#'>
                      <i className='fab fa-facebook-f'></i>
                    </Link>
                    <Link to='#'>
                      <i className='fab fa-twitter'></i>
                    </Link>
                    <Link to='#'>
                      <i className='fab fa-linkedin-in'></i>
                    </Link>
                    <Link to='#'>
                      <i className='fab fa-pinterest'></i>
                    </Link>
                  </div>
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
                  © 2023 Edumel All rights reserved by{' '}
                  <Link to='https://themeturn.com' rel='nofollow'>
                    Pxelcode
                  </Link>{' '}
                </p>
              </div>
              <div className='col-xl-6 col-sm-12 col-lg-6'>
                <div className='footer-btm-links text-start text-sm-center text-lg-end'>
                  <Link to='#'>Legal</Link>
                  <Link to='#'>Supports</Link>
                  <Link to='#'>Terms</Link>
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
