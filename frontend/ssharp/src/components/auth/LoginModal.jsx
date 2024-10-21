import React from 'react';
import './LoginModal.css';

const LoginModal = ({ onClose }) => {
  const handleLoginRedirect = () => {
    window.location.href = '/login'; // 로그인 페이지로 리다이렉트
  };

  return (
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>로그인이 필요한 서비스입니다.</h2>
          <button style={{background:'#FFC93A'}} className='btn btn-warning' onClick={handleLoginRedirect}>로그인</button>
        </div>
      </div>
  );
};

export default LoginModal;
