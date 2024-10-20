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
        <div style={{ margin: '20px 0', display: 'flex', flexWrap: 'wrap' }}>
          {allTags.map((tag, index) => (
              <span
                  key={index}
                  className={`tag ${selectedTag === tag ? 'selected' : ''}`}
                  onClick={() => handleTagClick(tag)}
                  style={{
                    background: selectedTag === tag ? '#007bff' : '#f0f0f0',
                    color: selectedTag === tag ? '#fff' : '#000',
                    borderRadius: '20px',
                    padding: '5px 10px',
                    margin: '5px',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                  }}
              >
            #{tag}
          </span>
          ))}
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: '20px',
        }}>
          {filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.map((data) => (
                  <div
                      key={data.id}
                      style={{
                        width: '300px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#fff',
                      }}
                  >
                    <div style={{ padding: '15px' }}>
                      <div style={{ marginBottom: '10px', fontSize: '14px', color: '#888' }}>
                        <i className='fa fa-calendar-alt' style={{ marginRight: '5px' }}></i>
                        {new Date(Date.parse(data.createdAt)).toLocaleDateString('ko-KR')}
                      </div>
                      <h3 style={{ margin: '0 0 10px', fontSize: '18px' }}>
                        <Link
                            to={`/course-details/${data.id}`}
                            style={{
                              textDecoration: 'none',
                              color: '#333',
                              transition: 'color 0.3s',
                            }}
                        >
                          {data.title}
                        </Link>
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {data.tags &&
                            data.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    style={{
                                      marginRight: '5px',
                                      fontSize: '14px',
                                      color: '#007bff',
                                    }}
                                >
                        #{tag}
                      </span>
                            ))}
                      </div>
                      <span className='post-author' style={{ fontSize: '14px', color: '#555' }}>작성자: {data.username}</span>
                    </div>
                  </div>
              ))
          ) : (
              <div>표시할 포스트가 없습니다.</div>
          )}
        </div>
      </>
  );
};

export default PostGrid;
