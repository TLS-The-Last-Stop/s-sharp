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

                <div style={{ margin: '-90px -85px -40px 117px'}} className='page-wrapper'>
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
