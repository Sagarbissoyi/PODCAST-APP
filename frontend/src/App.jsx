import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login.jsx';
import Categories from './pages/Categories.jsx';
import Profile from './pages/Profile.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth.js';
import { AddPodcast } from './pages/AddPodcast.jsx';

const App = () => {
  const dispatch = useDispatch();
useEffect(() => {
const fetch = async () => {
  try {
  const res = await axios.get("https://podcast-app-txd7.onrender.com/api/v1/check-cookie"
    ,{withCredentials:true}
  ) ;
    if(res.data.message == true)
    {
      dispatch(authActions.login());
    }
  }catch(error){
  // console.log(error);
  }
};
fetch();
}, []);


  return (
    <div className="">
      <Router>
        <Routes >
          <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/add-podcast' element={<AddPodcast/>}/>
          </Route>
          <Route path="/" element={<AuthLayout/>}>
         <Route path="/signup" element={<Signup/>}/>
         <Route path="/login" element={<Login/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
