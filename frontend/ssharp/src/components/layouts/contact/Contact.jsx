import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../utils/authUtils';
import '../../../app/css/myPage.css';

const MyPage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    image: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const axiosInstance = axiosWithAuth();
        const response = await axiosInstance.get('http://localhost:8080/api/user/me');
        console.log('Response from server:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const axiosInstance = axiosWithAuth();
      await axiosInstance.delete('http://localhost:8080/api/user/me');
      console.log('회원 탈퇴 완료');
      window.location.href = '/';
    } catch (error) {
      console.error('회원 탈퇴 중 오류 발생:', error);
    }
  };

  return (
    <section className='mypage-container section-padding'>
      <div className='mypage-card'>
        <h2 className='mypage-title'>개인정보</h2>
        <hr />
        <div className='mypage-user-info'>
          <div className='mypage-user-details'>
            <h3>계정</h3>
            <p>
              <strong>이름:</strong> {user.name}
            </p>
            <p>
              <strong>이메일:</strong> {user.email}
            </p>
          </div>
        </div>
        <button className='mypage-btn btn-danger' onClick={handleDeleteAccount}>
          회원 탈퇴
        </button>
      </div>
    </section>
  );
};

export default MyPage;
