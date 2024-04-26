import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import NotFound from '../pages/NotFound';
import Post from './Post';
import Login from '../pages/Login';
import { AuthContext } from '../context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />
  }

  return (
    isAuth
      ?
      <Routes>
        < Route path='/' element={< Login />} />
        < Route path='/about' element={< About />} />
        < Route path='/posts' element={< Posts />} />
        < Route exact path='/posts/:id' element={< Post />} />

        < Route path='*' element={< NotFound />} />
      </Routes >
      :
      <Routes>
        < Route path='/*' element={< Login />} />
      </Routes >
  );
}

export default AppRouter;
