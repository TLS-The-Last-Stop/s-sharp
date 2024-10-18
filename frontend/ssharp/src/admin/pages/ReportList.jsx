import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { reportService } from '../api/reportSevice';
import SearchResult from '../components/SearchResult';
import styled from 'styled-components';


const ReportListContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const SearchBarWrapper = styled.div`
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
    padding: 0 0;
    margin-top: 3rem;
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 20px;
`;

const LoadingMessage = styled.p`
    text-align: center;
    font-size: 18px;
    color: #666;
`;

const ErrorMessage = styled.p`
    text-align: center;
    font-size: 18px;
    color: #d32f2f;
`;

const ReportList = () => {
  const [searchParams, setSearchParams] = useState({ condition: 'all', keyword: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReports = async (params) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await reportService.getAllReport(0, 50, params.keyword, params.condition);
      const data = result.data.content;

      if (data.length > 0) setSearchResults(result.data.content);
      else setError('검색 결과가 없습니다.');
    } catch (error) {
      setError('검색 중 오류가 발생하였습니다.');
      console.error('Search error: ', error);
    } finally {
      setIsLoading(false);
    }

  };

  const handleSearch = async (params) => {
    setSearchParams(params);
    fetchReports(params);
  };

  useEffect(() => {
    fetchReports(searchParams);
  }, []);

  return (
    <ReportListContainer>
      <SearchBarWrapper>
        <SearchBar onSearch={handleSearch} />
      </SearchBarWrapper>
      <ContentWrapper>
        {isLoading ? (
          <LoadingMessage>로딩 중...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <SearchResult results={searchResults} />
        )}
      </ContentWrapper>
    </ReportListContainer>
  );
};

export default ReportList;