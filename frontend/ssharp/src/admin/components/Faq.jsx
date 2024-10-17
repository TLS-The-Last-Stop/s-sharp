import React, { useCallback, useEffect, useMemo, useState } from 'react';
import faqData from '../data/FaqData.json';
import styled from 'styled-components';

const FaqContainer = styled.div`
    height: 100%;
    overflow-y: auto;
    padding: 10px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const FaqItem = styled.div`
    margin-bottom: 15px;
`;

const Question = styled.h5`
    margin: 0;
    cursor: pointer;
`;

const ShowMoreButton = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

const Faq = ({ onSelectItem }) => {
  const [searchData, setSearchData] = useState('');
  const [showAll, setShowAll] = useState(false);
  const faq = faqData.faqData;

  const topFaq = useMemo(() => (
    [...faq].sort((a, b) => b.views - a.views).slice(0, 10)
  ),[faq]);

  const handleSearch = e => {
    setSearchData(e.target.value);
  };

  const filteredFap = useCallback(() => {
    const dataToFilter = showAll ? faq:topFaq;
      return dataToFilter.filter(item =>
        item.question.toLowerCase().includes(searchData.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchData.toLowerCase())
      );
    }, [faq, topFaq, searchData, showAll]
  );

  const toggleShowAll=()=>{
    setShowAll(!showAll)
  }

  return (
    <FaqContainer>
      <SearchInput type="text" placeholder="검색어를 입력하세요" value={searchData} onChange={handleSearch} />
      {filteredFap().map((item, index) => (
        <FaqItem key={item.id} onClick={() => onSelectItem(item)}>
          <Question>{index + 1}. {item.question}</Question>
        </FaqItem>
      ))}

      {!showAll && (
        <ShowMoreButton onClick={toggleShowAll}>
          더 많은 질문 보기
        </ShowMoreButton>
      )}
      
    </FaqContainer>
  );
};

export default Faq;