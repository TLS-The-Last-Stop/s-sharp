import React, { useState } from 'react';
import { PageBanner, PostGrid } from '../layouts/blog/index';

import Layout from '../../common/Layout';

const BlogPageOne = () => {
  return (
    <div className='about'>
      <Layout>
        <PageBanner
          title='Blog Grid'
          rootUrl='/'
          parentUrl='Home'
          currentUrl='Blog Grid'
        />

        <div className='page-wrapper'>
          <div className='container'>
            <div className='row'>
              <PostGrid />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default BlogPageOne;
