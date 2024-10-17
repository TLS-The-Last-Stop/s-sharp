import React from 'react'
import {Outlet} from "react-router-dom";
import Main from "../pages/Main";
import SideBar from "../components/SideBar";
import styled from "styled-components";

const Body = styled.div`
    display: flex;
    height: 100vh;
`

const AsideCss = styled.div`
    margin-top: 3rem;
    background: #58151c;
    width: 20%;
`

const MainCss = styled.div`
    position: relative;
    width: 80%;
    box-sizing: border-box;

    button {
        padding: 0;
        border-radius: 0;
        background: #bbbebe;
        padding: 5px;
    }
`

const Layout = () => {
  return (
      <Body>
        <AsideCss>
          <SideBar/>
        </AsideCss>
        <MainCss>
          <Main>
            <Outlet/>
          </Main>
        </MainCss>
      </Body>
  )
}

export default Layout