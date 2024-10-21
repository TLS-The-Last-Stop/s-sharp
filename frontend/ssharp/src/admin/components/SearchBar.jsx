import styled from 'styled-components';
import React, { useState } from 'react';

const SearchBarDiv = styled.div`
    padding: 0 20px;

    form {
        display: flex;
        justify-content: space-between;
        max-width: 800px;
        margin: 0 auto;

        select {
            height: 45px;
            border: 1px solid #ddd;
            border-radius: 4px 0 0 4px;
            padding: 0 10px;
        }

        input {
            flex-grow: 1;
            height: 45px;
            border: 1px solid #ddd;
            border-left: none;
            padding: 0 10px;
        }

        button {
            height: 45px;
            border: 1px solid #ddd;
            border-left: none;
            border-radius: 0 4px 4px 0;
            background-color: #f0f0f0;
            color: #6c757d;
            padding: 0 20px;
            cursor: pointer;
        }
    }
`;

const searchObj = {
  condition: 'all',
  keyword  : ''
};

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState(searchObj);

  const handleChange = e => {
    setSearch(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <SearchBarDiv>
      <form action="" onSubmit={onSubmit}>
        <select name="condition" onChange={handleChange} value={search.condition}>
          <option value="all">전체</option>
          <option value="username">닉네임</option>
          <option value="title">글제목</option>
        </select>
        <input type="text" name="keyword" onChange={handleChange} placeholder="검색어를 입력해주세요." autoComplete="false" />
        <button>검색 고</button>
      </form>
    </SearchBarDiv>
  );
};

export default SearchBar;