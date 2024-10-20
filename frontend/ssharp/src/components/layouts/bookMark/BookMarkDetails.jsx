import React, {useEffect, useState} from 'react';
import {Accordion, Alert, Spinner} from 'react-bootstrap';
import {axiosWithAuth} from '../../../utils/authUtils';

const BookMarkDetails = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const axiosInstance = axiosWithAuth();
                const response = await axiosInstance.get(`http://localhost:8080/api/bookmark-list`);
                if (Array.isArray(response.data)) {
                    setBookmarks(response.data);
                } else {
                    throw new Error('서버에서 올바른 형식의 데이터를 받지 못했습니다.');
                }
            } catch (error) {
                console.error('북마크 불러오기 실패:', error);
                setError('북마크를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">로딩중...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <section className='page-wrapper d-flex justify-content-center align-items-center min-vh-50'>
            <div className='container' style={{maxWidth: '800px'}}>
                <h1 className='text-center mb-5'>내 북마크</h1>
                {bookmarks.length === 0 ? (
                    <Alert variant="info">북마크한 게시물이 없습니다.</Alert>
                ) : (
                    <Accordion alwaysOpen>
                        {bookmarks.map((bookmark) => (
                            <Accordion.Item eventKey={bookmark.id?.toString()} key={bookmark.id}>
                                <Accordion.Header>
                                    <div className='d-flex align-items-center'>
                                        <i className='ri-bookmark-fill me-2' style={{color: '#007bff'}}></i>
                                        <span>{bookmark.post?.title || '제목 없음'}</span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p>{bookmark.post?.content || '내용 없음'}</p>
                                    <p>북마크 생성
                                        시간: {bookmark.createdAt ? new Date(bookmark.createdAt).toLocaleString() : '시간 정보 없음'}</p>
                                    <p>작성자: {bookmark.user?.username || '알 수 없음'}</p>
                                    {bookmark.post && (
                                        <a href={`/course-details/${bookmark.post.id}`}
                                           className='btn btn-primary btn-sm'>
                                            게시물로 이동
                                        </a>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                )}
            </div>
        </section>
    );
};

export default BookMarkDetails;
