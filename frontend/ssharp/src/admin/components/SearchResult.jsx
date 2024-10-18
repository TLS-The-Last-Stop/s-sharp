import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const ReportCard = styled.div`
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReportHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const ReportId = styled.h3`
    margin: 0;
    color: #495057;
`;

const ReportStatus = styled.span`
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: bold;
    background-color: ${props => props.status === 'CHECKING' ? '#ffd43b' : '#51cf66'};
    color: ${props => props.status === 'CHECKING' ? '#212529' : '#fff'};
`;

const ReportInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

const InfoItem = styled.p`
    margin: 0;
    color: #495057;

    strong {
        color: #212529;
    }
`;


const SearchResult = ({ results }) => {

  if (results.length === 0) return <p>검색 결과가 없습니다.</p>;

  return (
    <ResultContainer>
      {results.map((report) => (
        <ReportCard key={report.id}>
          <ReportHeader>
            <ReportId>신고 ID: {report.id}</ReportId>
            <ReportStatus status={report.reportStatus}>{report.reportStatus}</ReportStatus>
          </ReportHeader>
          <ReportInfo>
            <InfoItem><strong>게시물 ID:</strong> {report.postId}</InfoItem>
            <InfoItem><strong>게시물 제목:</strong> {report.title || 'N/A'}</InfoItem>
            <InfoItem><strong>게시물 작성자:</strong> {report.postUserNickname}</InfoItem>
            <InfoItem><strong>신고자:</strong> {report.reportUserNickname}</InfoItem>
            <InfoItem><strong>사유:</strong> {report.reason}</InfoItem>
            <InfoItem><strong>신고 유형:</strong> {report.reportType}</InfoItem>
            <InfoItem><strong>신고 일시:</strong> {new Date(report.createdAt).toLocaleString()}</InfoItem>
          </ReportInfo>
        </ReportCard>
      ))}
    </ResultContainer>
  );
};

export default SearchResult;