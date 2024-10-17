import React from 'react';
import Layout from '../../common/Layout';
import { CourseDetails } from '../layouts/courseDetails/index';
import ShareButton from '../widgets/share/ShareButton';
import BookMarkButton from '../widgets/bookmark/BookMarkButton';
import { ToastContainer } from 'react-toastify';

const CourseDetails01 = () => {
  const currentUser = { id: 1, name: '김다은' };
  const currentPost = { id: 2, name: '게시글1' };

  return (
    <div className='course-page'>
      <Layout>
        <CourseDetails />
        <div
          style={{
            position: 'fixed',
            left: '20px',
            top: '375px',
            zIndex: 1000,
          }}
        >
          <ShareButton />
          <BookMarkButton userId={currentUser.id} postId={currentPost.id} />
        </div>
      </Layout>
      <ToastContainer />
    </div>
  );
};

export default CourseDetails01;
