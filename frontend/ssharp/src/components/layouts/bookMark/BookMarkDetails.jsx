import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { axiosWithAuth } from '../../../utils/authUtils'; // 이 경로는 실제 프로젝트 구조에 맞게 조정해주세요

const BookMarkDetails = ({ userId }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const axiosInstance = axiosWithAuth();
        const response = await axiosInstance.get(
          `http://localhost:8080/api/bookmark-list`
        );
        setBookmarks(response.data);
      } catch (error) {
        console.error('북마크 불러오기 실패:', error);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <section className='page-wrapper d-flex justify-content-center align-items-center min-vh-50'>
      <div className='container' style={{ maxWidth: '800px' }}>
        <h1 className='text-center mb-5'>내 북마크</h1>
        <Accordion alwaysOpen>
          {bookmarks.map((bookmark, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                <div className='d-flex align-items-center'>
                  <i
                    className='ri-bookmark-fill me-2'
                    style={{ color: '#007bff' }}
                  ></i>
                  <span>{bookmark.post.title}</span>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <span>{bookmark.post.content}</span>
                <p>
                  북마크 생성 시간:{' '}
                  {new Date(bookmark.createdAt).toLocaleString()}
                </p>
                <p>
                  작성자 : {bookmark.user.username}
                </p>
                <a
                  href={`/course-details/${bookmark.post.id}`}
                  className='btn btn-primary btn-sm'
                >
                  게시물로 이동
                </a>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default BookMarkDetails;
