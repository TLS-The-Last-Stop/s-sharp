import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Accordion, useAccordionButton } from 'react-bootstrap';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { FaStar } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { axiosWithAuth } from '../../../utils/authUtils';
import { useNavigate } from 'react-router-dom';


const CustomToggle = ({ children, eventKey }) => {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(eventKey);
  const isCurrentEventKey = activeEventKey === eventKey;
  return (
      <button
          type='button'
          onClick={decoratedOnClick}
          aria-expanded={isCurrentEventKey ? true : false}
          className='edu-accordion-button'
      >
        {children}
      </button>
  );
};


const CurriculumContent = () => {
  const [activeId, setActiveId] = useState('0');

  function toggleActive(id) {
    setActiveId(activeId === id ? null : id);
  }

  return (
      <Accordion bsPrefix='edu-accordion-02' defaultActiveKey={activeId} flush>
        {CurriculumTabContent.map((accordion, i) => (
            <Accordion.Item
                eventKey={i.toString()}
                key={i}
                onClick={() => toggleActive(i.toString())}
                bsPrefix={`edu-accordion-item ${
                    activeId === i.toString() ? 'bg-active' : ''
                }`}
            >
              <div className='edu-accordion-header'>
                <CustomToggle eventKey={i.toString()}>{accordion.title}</CustomToggle>
              </div>
              <Accordion.Body bsPrefix='edu-accordion-body'>
                <ul>
                  {accordion.content.map((title, index) => (
                      <li key={index}>
                        <div className='text'>
                          <i className='ri-draft-line'></i>
                          {title}
                        </div>
                        <div className='icon'>
                          <i className='ri-lock-password-line'></i>
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
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(0);
  const [contentTab, setContentTab] = useState('overview');
  const ARRAY = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axiosWithAuth().get(
            `http://localhost:8080/api/post/detail/${id}`
        );
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setIsLoading(false);
      }
    };
    fetchPostDetails();
  }, [id]);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axiosWithAuth().delete(`http://localhost:8080/api/post/${id}`);
      alert('글이 성공적으로 삭제되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('글 삭제 중 오류 발생:', error);
      alert('작성자만 글을 삭제할 수 있습니다.');
    }
  };
  // 리뷰 목록 가져오기
  useEffect(() => {
    axiosWithAuth()
        .get(`http://localhost:8080/review/getList?postId=${id}`)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }, [id]);

  // 리뷰 평점 평균 가져오기
  useEffect(() => {
    const fetchAvg = () => {
      axiosWithAuth()
          .get('http://localhost:8080/review/getAvg')
          .then((response) => {
            setAvg(response.data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    };

    fetchAvg();
    const intervalId = setInterval(fetchAvg, 1000000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 리뷰 작성 함수
  const SubmitReview = async () => {
    try {
      const response = await axiosWithAuth().post(
          'http://localhost:8080/review/write',
          {
            content: content,
            rating: rating,
            postId: id,
          }
      );
      setReviews([...reviews, { content, rating, user: { username: '나' } }]);
      setContent('');
      setRating(0);
      console.log('리뷰 작성 성공:', response.data);
    } catch (error) {
      console.error('리뷰 작성 오류:', error);
    }
  };

  const handleTab = (content) => {
    setContentTab(content);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
      <>
        <section className='page-wrapper'>
          <div className='tutori-course-content tab-style-1'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-7 col-xl-8'>
                  <div className='course-details-header mb-5'>
                    <div className='course-meta-info mb-4'>
                      <div className='d-flex align-items-center'>
                        <div className='author me-4'>
                          {}
                          작성자 <a href='/'>{post.username || '작성자'}</a>
                        </div>

                        <div className='d-flex justify-content-between align-items-center'>
                        <span>
                          <i className='ri-bar-chart-2-line me-2'></i>
                        </span>
                        </div>

                        <div className='d-flex justify-content-between align-items-center'>
                        <span className='post-date'>
                          <i className='fa fa-calendar-alt mr-2'></i>
                          작성일 |{' '}
                          {new Date(
                              Date.parse(post.createdAt)
                          ).toLocaleDateString('ko-KR')}
                        </span>
                        </div>

                        <div className='rating review-stars-rated'>
                          &nbsp; 평점:&nbsp;
                          {[...ARRAY].map((_, i) => (
                              <a href='#' key={i}>
                                <i
                                    className={`fa fa-star${i < avg ? '' : '-o'}`}
                                ></i>
                              </a>
                          ))}
                        </div>
                        <div>
                        <button onClick={handleDelete} className='btn btn-outline-secondary'>
                          삭제
                        </button>
                      </div>
                      </div>
                    </div>
                    <div className='post-tags'>
                      {post.tags &&
                          post.tags.map((tag, index) => (
                              <span key={index} className='tag'>
                          #{tag}
                        </span>
                          ))}
                    </div>
                    <h1 className='course-title'>{post.title || '제목 없음'}</h1>
                    <div
                        className='course-content'
                        dangerouslySetInnerHTML={createMarkup(post.content || '')}
                    />
                  </div>

                  <nav className='course-single-tabs learn-press-nav-tabs'>
                    <ul className='nav nav-tabs course-nav' role='tablist'>
                      <li className='nav-item'>
                        <a
                            className={
                              contentTab === 'reviews'
                                  ? 'nav-link active'
                                  : 'nav-link'
                            }
                            type='button'
                            onClick={() => handleTab('reviews')}
                        >
                          리뷰
                        </a>
                      </li>
                    </ul>
                  </nav>

                  <div className='tab-content tutori-course-content'>
                    {contentTab === 'reviews' && (
                        <div
                            className={`tab-pane fade show ${
                                contentTab === 'reviews' ? 'active' : ''
                            }`}
                        >
                          <div className='course-tab-content'>
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
                                resize: 'vertical',
                              }}
                              onChange={(e) => setContent(e.target.value)}
                          />
                              <button id='button' onClick={SubmitReview}>
                                댓글작성
                              </button>
                            </div>
                            <div>
                              {ARRAY.map((el, index) => (
                                  <FaStar
                                      key={index}
                                      size={24}
                                      color={index < rating ? '#ffc107' : '#e4e5e9'}
                                      onClick={() => setRating(index + 1)}
                                  />
                              ))}
                            </div>

                            <div id='course-reviews'>
                              <ul className='course-reviews-list'>
                                {reviews.map((review, index) => (
                                    <li key={index}>
                                      <div className='course-review'>
                                        <div className='course-single-review'>
                                          <div className='user-content user-review-content'>
                                            <div className='review-header mb-10'>
                                              <div className='rating review-stars-rated'>
                                                {[...Array(review.rating)].map(
                                                    (_, i) => (
                                                        <a href='#' key={i}>
                                                          <i className='fa fa-star'></i>
                                                        </a>
                                                    )
                                                )}
                                              </div>
                                              <div className='review-author'>
                                                {}
                                                작성자: {review.user?.username || '알 수 없음'}
                                              </div>
                                            </div>
                                            <div className='review-text'>
                                              <div className='review-content'>
                                                {review.content}
                                              </div>
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
                {}
              </div>
            </div>
          </div>
        </section>
      </>
  );
};

export default CourseDetails;
