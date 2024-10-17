import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';
import CourseData from '../../../data/course/CourseData.json';


import InstructorData from '../../../data/instructor/InstructorData.json';
import CurriculumTabContent from '../../../data/course/CurriculumTabContent.json';

import { slugify } from '../../../utils/index';
import RelatedCourses from './RelatedCourses';

import CourseInfo from './CourseInfo';
import { FaStar } from 'react-icons/fa';
import { useState,useEffect } from "react";




const CustomToggle = ({ children, eventKey }) => {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(eventKey);
  const isCurrentEventKey = activeEventKey === eventKey;
  return (
    <button
      type="button"
      onClick={decoratedOnClick}
      aria-expanded={isCurrentEventKey ? true : false}
      className="edu-accordion-button"
    >
      {children}
    </button>
  );
};

const CurriculumContent = () => {
  const [activeId, setActiveId] = useState('0');

  function toggleActive(id) {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  }
  

    
  
  return (
    <Accordion bsPrefix="edu-accordion-02" defaultActiveKey={activeId} flush>
      {CurriculumTabContent.map((accordion, i) => (
        <Accordion.Item
          eventKey={i.toString()}
          key={i}
          onClick={() => toggleActive(i.toString())}
          bsPrefix={`edu-accordion-item ${activeId === i.toString() ? 'bg-active' : ''}`}
        >
          <div className="edu-accordion-header">
            <CustomToggle eventKey={i.toString()}>{accordion.title}</CustomToggle>
          </div>
          <Accordion.Body bsPrefix="edu-accordion-body">
            <ul>
              {accordion.content.map((title, index) => (
                <li key={index}>
                  <div className="text">
                    <i className="ri-draft-line"></i>
                    {title}
                  </div>
                  <div className="icon">
                    <i className="ri-lock-password-line"></i>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

const CourseDetails = () => {
  const { id } = useParams();
  const courseId = parseInt(id, 10);
  const data = CourseData.filter((course) => course.id === courseId);
  const courseItem = data[0];
  const [name, setName] = useState("기본이름");
  const [addr, setAddr] = useState('기본주소');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews,setReviews] = useState([]);
  const [avg, setAvg] = useState(0);
  const ARRAY = [1, 2, 3, 4, 5];
useEffect(()=>{
  fetch('http://localhost:8080/review/getList', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    // 성공 후 처리 (예: 입력 필드 초기화)
    setContent('')
    setReviews(data)
    console.log('useEffect 실행')
  })
  .catch((error) => {
    setContent('')
    console.error('Error:', error);
    // 오류 처리
  });
        return ()=> {
        }
    },[])
    useEffect(() => {
      const fetchAvg = () => {
        fetch('http://localhost:8080/review/getAvg', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          setAvg(data);
          console.log('Average updated:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      };
    
      // 초기 실행
      fetchAvg();
    
      // 5초마다 실행 (원하는 간격으로 조정 가능)
      const intervalId = setInterval(fetchAvg, 1000);
    
      // 클린업 함수
      return () => {
        clearInterval(intervalId);
      };
    }, []); // 빈 의존성 배열
    const getList = () => {
      fetch('http://localhost:8080/review/getList', {
        method: 'GET',
        headers: {
       'Content-Type': 'application/json'  
    }
  })
  .then(response => response.json())
  .then(data => {
    // 성공 후 처리 (예: 입력 필드 초기화)
    setContent('')
    setReviews(data)
  })
  .catch((error) => {
    setContent('')
    console.error('Error:', error);
    // 오류 처리
  });
    }

    const getAvgOfRating = () => {
      fetch('http://localhost:8080/review/getAvg', {
        method: 'GET',
        headers: {
       'Content-Type': 'application/json'  
    }
  })
  .then(response => response.json())
  .then(data => {
    // 성공 후 처리 (예: 입력 필드 초기화)
    setContent('')
    setAvg(data)
  })
  .catch((error) => {
    setContent('')
    console.error('Error:', error);
    // 오류 처리
  });
    }
    const SubmitReview = () => {
      fetch('http://localhost:8080/review/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({content: content, rating: rating}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setContent('');
        setRating(0);
        // 새로운 리뷰를 기존 리뷰 목록에 추가
        setReviews([...reviews, {content: content, rating: rating}]);
       

      })
      .catch((error) => {
        console.error('Error:', error);
        setContent('');
        
      });
    };
  const indexOfInstructor = InstructorData.findIndex(function (instructor) {
    return slugify(instructor.name) === slugify(courseItem.instructor);
  });
  const instructor = InstructorData[indexOfInstructor];
  const instructorExcerpt = instructor.details.substring(0, 190) + '...';
  const instructorThumb = InstructorData[indexOfInstructor].image;

  const [contentTab, setContentTab] = useState('overview');
  const handleTab = (content) => {
    if (content === 'overview') {
      setContentTab('overview');
    } else if (content === 'curriculum') {
      setContentTab('curriculum');
    } else if (content === 'instructor') {
      setContentTab('instructor');
    } else if (content === 'reviews') {
      setContentTab('reviews');
    }
  };

  return (
    <>
      <section className="page-wrapper">
        <div className="tutori-course-content tab-style-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-xl-8">
                <div className="course-details-header mb-5 ">
                  <div className="course-meta-info mb-4">
                    <div className="d-flex align-items-center">
                      <div className="author me-4">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/assets/images/instructor/${instructorThumb}`}
                          alt=""
                          className="img-fluid"
                        />
                        By <a href="/">{courseItem.instructor}</a>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <span>
                          <i className="ri-bar-chart-2-line me-2"></i>
                        </span>
                        작성자 이름 예정 &nbsp;&nbsp;&nbsp;&nbsp;
                      </div>

                      <div className="rating review-stars-rated">
                        평점:&nbsp;{[...Array(avg)].map((_, i) => (
                          <a href="#" key={i}>
                            <i className="fa fa-star"></i>
                           
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h1 className="course-title">{courseItem.title}</h1>
                </div>

                <nav className="course-single-tabs learn-press-nav-tabs">
                  <ul className="nav nav-tabs course-nav" role="tablist">
                    <li className="nav-item">
                      <a
                        className={contentTab === 'overview' ? 'nav-link active' : 'nav-link'}
                        type="button"
                        aria-label="Overview"
                        onClick={() => handleTab('overview')}
                      >
                        Overview
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={contentTab === 'curriculum' ? 'nav-link active' : 'nav-link'}
                        type="button"
                        aria-label="Curriculum"
                        onClick={() => handleTab('curriculum')}
                      >
                        Curriculum
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={contentTab === 'instructor' ? 'nav-link active' : 'nav-link'}
                        type="button"
                        aria-label="Instructor"
                        onClick={() => handleTab('instructor')}
                      >
                        Instructor
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={contentTab === 'reviews' ? 'nav-link active' : 'nav-link'}
                        type="button"
                        aria-label="Reviews"
                        onClick={() => handleTab('reviews')}
                      >
                      리뷰
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="tab-content tutori-course-content">
                  {/* Overview Tab */}
                  {contentTab === 'overview' && (
                    <div className={`tab-pane fade show ${contentTab === 'overview' ? 'active' : ''} `}>
                      <div className="single-course-details ">
                        <div className="course-tab-content" dangerouslySetInnerHTML={{ __html: courseItem.details }} />
                      </div>
                    </div>
                  )}

                  {/*  Curiculam Tab */}
                  {contentTab === 'curriculum' && (
                    <div className={`tab-pane fade show ${contentTab === 'curriculum' ? 'active' : ''} `}>
                      <div className="course-tab-content">
                        <CurriculumContent />
                      </div>
                    </div>
                  )}

                  {/*  INstructor Tab */}
                  {contentTab === 'instructor' && (
                    <div className={`tab-pane fade show ${contentTab === 'instructor' ? 'active' : ''} `}>
                      <div className="course-tab-content">
                        <div className="courses-instructor">
                          <div className="single-instructor-box">
                            <div className="row align-items-center">
                              <div className="col-lg-4 col-md-4">
                                <div className="instructor-image">
                                  <img
                                    src={`${import.meta.env.VITE_API_URL}/assets/images/team/${instructor.imageLg}`}
                                    alt="Author Thumb"
                                  />
                                </div>
                              </div>

                              <div className="col-lg-8 col-md-8">
                                <div className="instructor-content">
                                  <h4>
                                    <Link
                                      to={
                                        import.meta.env.VITE_API_URL +
                                        `/instructor-details/${slugify(courseItem.instructor)}`
                                      }
                                    >
                                      {instructor.name}
                                    </Link>
                                  </h4>
                                  <span className="sub-title">{instructor.designation}</span>

                                  <p>{instructorExcerpt}</p>

                                  <div className="intructor-social-links">
                                    <span className="me-2">Follow Me: </span>
                                    <a href={instructor.facebookUrl}>
                                      <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a href={instructor.linkedInUrl}>
                                      <i className="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href={instructor.pinterest}>
                                      <i className="fab fa-pinterest"></i>
                                    </a>
                                    <a href={instructor.twitterUrl}>
                                      <i className="fab fa-twitter"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* COURSE AUTHOR END */}
                      </div>
                    </div>
                  )}

                  {/*  Review TAb */}
                  {contentTab === 'reviews' && (
  <div className={`tab-pane fade show ${contentTab === 'reviews' ? 'active' : ''} `}>
    <div className="course-tab-content">
      {/* 리뷰 작성 부분 */}
      <div>
        <textarea 
          value={content} 
          style={{
            width: '100%',
            maxWidth: '100%',
            padding: '10px',
            fontSize: '16px',
            boxSizing: 'border-box',
            height: '100px',
            resize: 'vertical'
          }} 
          onChange={(e) => setContent(e.target.value)}  
        />         
        <button id='button' onClick={SubmitReview}>댓글작성</button>
      </div>
      <div>
        {ARRAY.map((el, index) => (
          <FaStar
            key={index}
            size={24}
            color={index < rating ? "#ffc107" : "#e4e5e9"}
            onClick={() => setRating(index + 1)}
          />
        ))}
      </div>

      {/* 리뷰 목록 */}
      <div id="course-reviews">
        <ul className="course-reviews-list">
          {reviews.map((review, index) => (
            <li key={index}>
              <div className="course-review">
                <div className="course-single-review">
                  <div className="user-image">
                    {/* 추후 이미지나 아이디 넣을 예정 */}
                  </div>
                  <div className="user-content user-review-content">
                    <div className="review-header mb-10">
                      <div className="rating review-stars-rated">
                        {[...Array(review.rating)].map((_, i) => (
                          <a href="#" key={i}>
                            <i className="fa fa-star"></i>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="review-text">
                      <div className="review-content">{review.content}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}
                </div>
              </div>

              <div className="col-lg-5 col-xl-4">
                <CourseInfo data={courseItem} />
              </div>
            </div>
          </div>
        </div>

        {/*  Related course */}
        <RelatedCourses courseID={courseItem.id} />
      </section>
    </>
  );
};
export default CourseDetails;
