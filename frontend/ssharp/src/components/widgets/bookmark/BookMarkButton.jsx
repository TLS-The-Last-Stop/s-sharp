import React, {useEffect, useState} from 'react';
import {BookmarkCheckIcon, BookmarkIcon} from 'lucide-react';
import {axiosWithAuth} from '../../../utils/authUtils';
import {useParams} from 'react-router-dom';

const BookMarkButton = ({userId}) => {
    const {id: postId} = useParams();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const checkBookmarkStatus = async () => {
            try {
                const axiosInstance = axiosWithAuth();
                const {data} = await axiosInstance.get('http://localhost:8080/api/bookmark/status', {
                    params: {userId, postId},
                });
                if (data) {
                    setIsBookmarked(data.isBookmarked);
                }
            } catch (error) {
                console.error('Failed to check bookmark status:', error);
            }
        };

        checkBookmarkStatus();
    }, [userId, postId]);

    const toggleBookmark = async () => {
        try {
            const axiosInstance = axiosWithAuth();
            await axiosInstance.post('http://localhost:8080/api/bookmark', {
                userId,
                postId,
            });
            setIsBookmarked((prev) => !prev);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 400);
        } catch (error) {
            console.error('Failed to toggle bookmark:', error);
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
        }

        .bookmark-button.animate {
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
                className={`bookmark-button ${isBookmarked ? 'active' : ''} ${isAnimating ? 'animate' : ''}`}
            >
                {isBookmarked ? (
                    <BookmarkCheckIcon size={27} color="white"/>
                ) : (
                    <BookmarkIcon size={27} color="white"/>
                )}
            </button>
        </div>
    );
};

export default BookMarkButton;
