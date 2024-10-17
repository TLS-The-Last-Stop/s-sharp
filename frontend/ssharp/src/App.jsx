import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';

import AboutMain from './components/pages/About';
import CourseFour from './components/pages/CourseFour';
import CourseList from './components/pages/CourseList';
import CourseOne from './components/pages/CourseOne';
import CourseThree from './components/pages/CourseThree';
import CourseTwo from './components/pages/CourseTwo';
import HomeOne from './components/pages/Home01';
import HomeTwo from './components/pages/Home02';

import CourseDetails from './components/pages/CourseDetails';
import CourseDetailsTwo from './components/pages/CourseDetailsTwo';

import InstructorOne from './components/pages/InstructorPage';

import Login from './components/pages/Login';
import Register from './components/pages/Register';

import BlogPageOne from './components/pages/BlogPageOne';
import ContactPage from './components/pages/ContactPage';

import OAuth2RedirectHandler from './components/pages/OAuth2RedirectHandler';

function App() {
  return (
      <BrowserRouter basename={import.meta.env.VITE_API_URL}>
        <Routes>
          <Route path={'/'} element={<HomeOne/>}/>
          <Route path={'/home-2'} element={<HomeTwo/>}/>
          <Route path={'/about'} element={<AboutMain/>}/>

          <Route path={'/course-1'} element={<CourseOne/>}/>
          <Route path={'/course-2'} element={<CourseTwo/>}/>
          <Route path={'/course-3'} element={<CourseThree/>}/>
          <Route path={'/course-4'} element={<CourseFour/>}/>
          <Route path={'/course-list'} element={<CourseList/>}/>

          <Route path={'/course-details/:id'} element={<CourseDetails/>}/>

          <Route path={'/course-details-two/:id'} element={<CourseDetailsTwo/>}/>

          <Route path={'/instructors'} element={<InstructorOne/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/register'} element={<Register/>}/>

          <Route path={'/contact'} element={<ContactPage/>}/>
          <Route path={'/blog'} element={<BlogPageOne/>}/>
          
          <Route path={'/oauth2/redirect'} element={<OAuth2RedirectHandler/>}/>

        </Routes>

        
      </BrowserRouter>
  );
}

export default App;