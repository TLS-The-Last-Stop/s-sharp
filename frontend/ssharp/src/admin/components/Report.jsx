import React, {useEffect, useState} from 'react';
import {PiSirenBold} from 'react-icons/pi';
import styled from 'styled-components';
import {reportService} from '../api/reportSevice';
import {useParams} from 'react-router-dom';
import ReportModal from './ReportModal';

const ReportWrapper = styled.div`
    width: 72px;
    height: 50px;
    text-align: center;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
    background: #43454b;

    p {
        line-height: 50px;
        color: #dc7f8e;
    }
`;

const Report = () => {
  const [reported, setReported] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {id} = useParams();

  const checkReport = async () => {
    const result = await reportService.isReported(id);
    if (result.message === 'true')
      setReported(true);
    else
      setReported(false);
  };

  const onClick = () => {
    if (reported) {
      alert('이미 신고접수가 되었습니다.');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSubmitReport = async (reportData) => {
    reportData.postId = id;
    try {
      await reportService.createReport(id, reportData);
      setReported(true);
      alert('신고 접수가 되었습니다.');
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  useEffect(() => {
    checkReport();
  }, [id]);

  return (
      <>
        <ReportWrapper onClick={onClick}>
          {reported ? (
              <div>
                {reported}
                <p>신고 완료</p>
              </div>
          ) : (
              <PiSirenBold size={30} color={'#fff'} style={{margin: '0.5rem'}}/>
          )}
        </ReportWrapper>
        <ReportModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmitReport}/>
      </>
  );
};

export default Report;