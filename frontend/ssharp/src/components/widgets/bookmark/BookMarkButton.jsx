import React, { useState, useEffect } from 'react';
import { BookmarkIcon, BookmarkCheckIcon } from 'lucide-react';
import { axiosWithAuth } from '../../../utils/authUtils';

const BookMarkButton = ({ userId, postId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkBookmarkStatus();
  }, [userId, postId]);

  const checkBookmarkStatus = async () => {
    try {
      const axiosInstance = axiosWithAuth();
      const response = await axiosInstance.get(
        `http://localhost:8080/api/bookmark/status`,
        {
          params: { userId, postId },
        }
      );
      setIsBookmarked(response.data.isBookmarked);
    } catch (error) {
      console.error('북마크 상태 확인 실패:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const axiosInstance = axiosWithAuth();
      await axiosInstance.post('http://localhost:8080/api/bookmark', {
        userId: userId,
        postId: postId,
      });
      console.log('북마크 토글 성공:', userId, postId);
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('북마크 토글 실패:', error);
      console.log('유저', userId);
      console.log('게시글id', postId);
    }
  };

  return (
    <div>
      <style>{`
        .bookmark-button {
          border: none;
          cursor: pointer;  
        }

        .bookmark-button.active {
          background-color: #2f2d51; 
          animation: scaleAnimation 0.2s ease 2; 
        }

        @keyframes scaleAnimation {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1); 
          }
        }
      `}</style>

      <button
        onClick={toggleBookmark}
        className={`bookmark-button ${isBookmarked ? 'active' : ''}`}
      >
        {isBookmarked ? (
          <BookmarkCheckIcon size={27} color='white' />
        ) : (
          <BookmarkIcon size={27} color='white' />
        )}
      </button>
    </div>
  );
};

export default BookMarkButton;
