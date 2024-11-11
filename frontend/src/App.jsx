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
import AllPodcasts from './pages/AllPodcasts';
import CategoriesPage from './pages/CategoriesPage.jsx';
import DescriptionPage from './pages/DescriptionPage.jsx';



///////////////////////   ADD SOME NEW FEATURES /////
import OnDelete from './pages/onDelete.jsx';          // Import OnDelete component
import OnEdit from './pages/OnEdit.jsx'; // Import OnEdit component




const App = () => {
  const dispatch = useDispatch();
useEffect(() => {
const fetch = async () => {
  try {
  const res = await axios.get("http://localhost:1000/api/v1/check-cookie"
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
          <Route path='/all-podcasts' element={<AllPodcasts/>}/>
          <Route path='/categories/:cat' element={<CategoriesPage/>} />
          <Route path='/description/:id' element={<DescriptionPage/>} />
          <Route path='/delete-podcast/:id' element={<OnDelete/>} /> {/* Add OnDelete route */}
          <Route path='/edit-podcast/:id' element={<OnEdit />} /> {/* Add OnEdit route */}

          {/* <Route path='/remove-podcast/:id' element={<RemovePodcasts/>} />//////////ADD NEW FEATURES/////// */}
          
          {/* <Route path='/description' element={<Description />} /> */}


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