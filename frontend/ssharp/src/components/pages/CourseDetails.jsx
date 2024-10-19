import React from 'react';
import Layout from '../../common/Layout';
import { CourseDetails } from '../layouts/courseDetails/index';
import ShareButton from '../widgets/share/ShareButton';
import BookMarkButton from '../widgets/bookmark/BookMarkButton';
import { ToastContainer } from 'react-toastify';
import Report from '../../admin/components/Report';
import styled from 'styled-components';

const PostSideDiv = styled.div`
    position: fixed;
    left: 20px;
    top: 375px;
    zIndex: 1000;
`;

const CourseDetails01 = () => {
  return (
    <div className="course-page">
      <Layout>
        <CourseDetails />
        <PostSideDiv>
          <ShareButton />
          <BookMarkButton />
          <Report />
        </PostSideDiv>
      </Layout>
      <ToastContainer />
    </div>
  );
};

export default CourseDetails01;
