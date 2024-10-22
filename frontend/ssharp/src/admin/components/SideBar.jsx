import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { HiOutlineBellAlert } from 'react-icons/hi2';

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const ListWrapper = styled.div`
    margin-top: 3rem;
`;

const onClickAlert = () => {
  alert('준비중 입니다.');
  return;
};

const SideBar = () => {
  return (
    <ListWrapper>
      <ImageWrapper>
        <HiOutlineBellAlert size={30} />
      </ImageWrapper>
      <ul style={{ textAlign: 'center' }}>
        <li><Link to="reports">신고 목록</Link></li>
        <li><Link to="#" onClick={onClickAlert}>태그 목록</Link></li>
        <li><Link to="faqs">FAQ 목록</Link></li>
      </ul>
    </ListWrapper>
  );
};

export default SideBar;