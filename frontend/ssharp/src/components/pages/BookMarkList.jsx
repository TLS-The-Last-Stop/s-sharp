import React from 'react';
import Layout from '../../common/Layout';

import { PageBanner, BookMarkDetails } from '../layouts/bookMark/index';

const BookMarkList = () => {
  return (
    <div className='contact-page'>
      <Layout>
        <PageBanner
          title='북마크'
          rootUrl='/'
          parentUrl='Home'
          currentUrl='BookMark'
        />
        <BookMarkDetails />
      </Layout>
    </div>
  );
};

export default BookMarkList;
