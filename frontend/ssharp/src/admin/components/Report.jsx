import React, { useEffect, useState } from 'react';
import { PiSirenBold } from 'react-icons/pi';
import styled from 'styled-components';

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

  useEffect(() => {

  }, []);

  return (
    <IconWrapper>
      <PiSirenBold size={30} color={'#fff'} style={{ margin: '0.5rem' }} />
    </IconWrapper>
  );
};

export default Report;