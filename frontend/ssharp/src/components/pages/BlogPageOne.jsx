import React from 'react';
import { PageBanner, PostGrid } from '../layouts/blog/index';

import Layout from '../../common/Layout';
import SearchOne from '../widgets/blog/SearchOne';

const BlogPageOne = () => {
  const groupPosts = (posts, size) => {
    return posts.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(posts.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  const groupedPosts = groupPosts(PostGrid.slice(0, 9), 3);

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
              <div className='col-lg-12 col-xl-12'>
                {groupedPosts.map((group, groupIndex) => (
                  <div className='row' key={groupIndex}>
                    {group.map((item) => (
                      <div className='col-lg-4 col-md-4 col-12' key={item.id}>
                        <PostGridOne data={item} />
                      </div>
                    ))}
                  </div>
                ))}

                {/* 페이징 (무한스크롤) */}
                <nav className='blog-page-navigation'>
                  <ul className='pagination'>
                    <li className='pagination-arrow'>
                      <a href='#'>
                        <i className='fa fa-angle-double-left'></i>
                      </a>
                    </li>
                    <li>
                      <a href='#'>1</a>
                    </li>
                    <li>
                      <a className='active' href='#'>
                        2
                      </a>
                    </li>
                    <li>
                      <a href='#'>3</a>
                    </li>
                    <li className='pagination-arrow'>
                      <a href='#'>
                        <i className='fa fa-angle-double-right'></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default BlogPageOne;
