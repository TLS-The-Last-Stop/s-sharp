import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import CourseDetails from './components/pages/CourseDetails';
import CourseDetailsTwo from './components/pages/CourseDetailsTwo';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import BlogPageOne from './components/pages/BlogPageOne';
import ContactPage from './components/pages/ContactPage';
import BookMarkList from './components/pages/BookMarkList';
import OAuth2RedirectHandler from './components/pages/OAuth2RedirectHandler';
import ReportList from './admin/pages/ReportList';
import TagList from './admin/pages/TagList';
import FaqList from './admin/pages/FaqList';
import Layout from './admin/layout/Layout';
import Write from './components/pages/Write';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
      <BrowserRouter basename={import.meta.env.VITE_API_URL}>
        <Routes>
          <Route path={'/'} element={<BlogPageOne />} />
          <Route path={'/course-details/:id'} element={<CourseDetails />} />
          <Route path={'/course-details-two/:id'} element={<CourseDetailsTwo />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/oauth2/redirect'} element={<OAuth2RedirectHandler />} />

          <Route path="/admin" element={<ProtectedRoute element={Layout} />}>
            <Route path="reports" element={<ReportList />} />
            <Route path="tags" element={<TagList />} />
            <Route path="faqs" element={<FaqList />} />
          </Route>
          <Route path={'/contact'} element={<ProtectedRoute element={ContactPage} />} />
          <Route path={'/write'} element={<ProtectedRoute element={Write} />} />
          <Route path={'/bookmark-list/:id'} element={<ProtectedRoute element={BookMarkList} />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;
