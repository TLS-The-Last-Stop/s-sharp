import React, { useEffect, useState } from 'react';
import { BookmarkCheckIcon, BookmarkIcon } from 'lucide-react';
import { axiosWithAuth, getCookie } from '../../../utils/authUtils';
import { useParams } from 'react-router-dom';
import LoginModal from '../../auth/LoginModal';

const BookMarkButton = ({ userId }) => {
    const { id: postId } = useParams();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false); // 모달 상태

    useEffect(() => {
        const checkBookmarkStatus = async () => {
            try {
                const axiosInstance = axiosWithAuth();
                const { data } = await axiosInstance.get('http://localhost:8080/api/bookmark/status', {
                    params: { userId, postId },
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
        const accessToken = getCookie('accessToken'); // 쿠키에서 토큰 확인

        if (!accessToken) {
            setShowLoginModal(true);
            return;
        }

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

    const handleModalClose = () => {
        setShowLoginModal(false); // 모달 닫기
    };

    return (
        <>
            <div style={{ marginBottom: '45px', left: '20px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 1000 }}>
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
                        <BookmarkCheckIcon size={27} color="white" />
                    ) : (
                        <BookmarkIcon size={27} color="white" />
                    )}
                </button>
            </div>

            {/* 로그인 모달 표시 */}
            {showLoginModal && <LoginModal onClose={handleModalClose} />}
        </>
    );
};

export default BookMarkButton;
