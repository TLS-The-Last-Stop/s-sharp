import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostGridOne = ({}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/posts')
      .then((response) => setPost(response.post))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {posts.map((data) => (
        <div className='blog-item mb-30'>
          <div className='post-thumb'></div>
          <div className='blog-content'>
            <div className='post-meta'>
              <span className='post-date'>
                <i className='fa fa-calendar-alt mr-2'></i>
                작성일 | {data.date}
              </span>
            </div>
            <h3 className='post-title'>
              <Link to={`/course-details/${data.id}`}>{data.title}</Link>
            </h3>
            <p>{data.tags}</p>
            <span className='post-author'> {data.userId} </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostGridOne;
