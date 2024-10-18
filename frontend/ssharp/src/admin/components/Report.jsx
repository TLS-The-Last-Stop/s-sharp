import React, { useEffect, useState } from 'react';
import { PiSirenBold } from 'react-icons/pi';
import styled from 'styled-components';
import { reportService } from '../api/reportSevice';
import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/authUtils';

const IconWrapper = styled.div`
    width: 72px;
    height: 50px;
    text-align: center;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
    background: #43454b;
`;

const Report = () => {
  const [status, setStatus] = useState(false);

  const { id } = useParams();

  const auth = axiosWithAuth();
  useEffect(() => {
    reportService.isReported(id);
  }, []);

  return (
    <IconWrapper>
      <PiSirenBold size={30} color={'#fff'} style={{ margin: '0.5rem' }} />
    </IconWrapper>
  );
};

export default Report;