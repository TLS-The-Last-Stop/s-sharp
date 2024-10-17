import styled from "styled-components";
import React, {useState} from "react";

const SearchBarDiv = styled.div`
    box-shadow: 10px 5px 5px rgba(68, 67, 67, 0.04);
    display: flex;
    justify-content: center;
    top: 150px;
    position: relative;

    form {
        border: 1px solid;
        width: 350px;
        display: flex;
        justify-content: space-between;

        select {
            height: 45px;
            border: none;
        }

        input {
            height: 45px;
            border: none;
        }
    }
`

const searchObj = {
  condition: "all",
  keyword  : ""
}

const SearchBar = () => {
  const [search, setSearch] = useState(searchObj);

  const handleChange = e => {
    setSearch(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const onSubmit = e => {
    e.preventDefault();
  }

  return (
      <SearchBarDiv>
        <form action="" onSubmit={onSubmit}>
          <select name="condition" onChange={handleChange} value={search.condition}>
            <option value="all">전체</option>
            <option value="nickname">닉네임</option>
            <option value="title">글제목</option>
          </select>
          <input type="text" name="keyword" onChange={handleChange} placeholder="검색어를 입력해주세요." autoComplete="false"/>
          <button>검색 고</button>
        </form>
      </SearchBarDiv>
  )
}

export default SearchBar