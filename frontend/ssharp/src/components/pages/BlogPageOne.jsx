import React, {useState} from 'react';
import {PageBanner, PostGrid} from '../layouts/blog/index';

import Layout from '../../common/Layout';
import Chatbot from "../../admin/components/Chatbot";

const BlogPageOne = () => {
  return (
      <div className='about'>
        <Chatbot/>
        <Layout>
          <PageBanner
              title='Blog Grid'
              rootUrl='/'
              parentUrl='Home'
              currentUrl='Blog Grid'
          />

          <div style={{ margin: '-45px -85px 0px 0px'}} className='page-wrapper'>
            <div className='container'>
              <div className='row'>
                <PostGrid/>
              </div>
            </div>
          </div>
        </Layout>
      </div>
  );
};

export default BlogPageOne;
