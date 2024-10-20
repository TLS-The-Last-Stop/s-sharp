import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostGrid = ({}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts');
        console.log('#####:', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('@@@@@ :', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((data) => (
          <div className='col-lg-4 col-md-6 col-sm-12 mb-4' key={data.id}>
            <div className='blog-item mb-30'>
              <div className='post-thumb'></div>
              <div className='blog-content'>
                <div className='post-meta'>
                  <span className='post-date'>
                    <i className='fa fa-calendar-alt mr-2'></i>
                    작성일 |{' '}
                    {new Date(Date.parse(data.createdAt)).toLocaleDateString(
                      'ko-KR'
                    )}
                  </span>
                </div>
                <div className='post-tags'>
                  {data.tags &&
                    data.tags.map((tag, index) => (
                      <span key={index} className='tag'>
                        #{tag}
                      </span>
                    ))}
                </div>
                <h3 className='post-title'>
                  <Link to={`/course-details/${data.id}`}>{data.title}</Link>
                </h3>
                <span className='post-author'> {data.id} </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>표시할 포스트가 없습니다.</div>
      )}
    </>
  );
};

export default PostGrid;
