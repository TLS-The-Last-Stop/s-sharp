import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostGrid = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allTags, setAllTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts');
        setPosts(response.data);
        setFilteredPosts(response.data);
        const tags = [
          ...new Set(response.data.flatMap((post) => post.tags || [])),
        ];
        setAllTags(tags);
      } catch (error) {
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setFilteredPosts(posts);
    } else {
      setSelectedTag(tag);
      const filtered = posts.filter(
          (post) => post.tags && post.tags.includes(tag)
      );
      setFilteredPosts(filtered);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
      <>
        <div className='all-tags'>
          {allTags.map((tag, index) => (
              <span
                  key={index}
                  className={`tag ${selectedTag === tag ? 'selected' : ''}`}
                  onClick={() => handleTagClick(tag)}
                  style={{ cursor: 'pointer' }}
              >
            #{tag}
          </span>
          ))}
        </div>

        {filteredPosts && filteredPosts.length > 0 ? (
            filteredPosts.map((data) => (
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
                      <span className='post-author'>작성자: {data.username}</span> {/* 작성자 이름 표시 */}
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
