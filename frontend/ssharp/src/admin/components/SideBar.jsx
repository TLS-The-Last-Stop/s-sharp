import {Link} from "react-router-dom";
import React from "react";
import styled from "styled-components";
import {HiOutlineBellAlert} from "react-icons/hi2";

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const SideBar = () => {
  return (
      <>
        <ImageWrapper>
          <HiOutlineBellAlert size={30}/>
        </ImageWrapper>
        <ul style={{textAlign: "center"}}>
          <li><Link to="reports">신고 목록</Link></li>
          <li><Link to="tags">태그 목록</Link></li>
          <li><Link to="chats">FAQ 목록</Link></li>
        </ul>
      </>
  )
}

export default SideBar