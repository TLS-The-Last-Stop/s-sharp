import React, { useState } from 'react';
import { BookmarkIcon, BookmarkCheckIcon } from 'lucide-react';
import axios from 'axios';

const BookMarkButton = ({ userId, postId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const toggleBookmark = async () => {
    try {
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/bookmark',
        data: {
          userId: userId,
          postId: postId,
        },
      });
      console.log(userId);
    } catch (error) {
      console.error('북마크 추가 실패:', error);
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
