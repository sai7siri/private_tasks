import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './User_Tasks/components/Header';
import SignIn from './User_Tasks/pages/SignIn';
import SignUp from './User_Tasks/pages/SignUp';
import Home from "./User_Tasks/components/Home.jsx"
import Complete from "./User_Tasks/components/Complete.jsx"
import Important from "./User_Tasks/components/Important.jsx"
import AllTasks from "./User_Tasks/components/AllTasks.jsx"


import { PrivateRoute, PublicRoute } from './User_Tasks/private/Private'; // Adjust import

function App() {


  return (
    <div className=''>
    
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute redirectPath="/home" />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute redirectPath="/home" />}>

          <Route path="/home" element={<Home />} >

          <Route index element={<AllTasks />} />

          <Route path="important" element={<Important />} />

          <Route path="complete" element={<Complete />} />
          </Route>
        </Route>

        {/* Redirect from root to signin */}
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>

    <ToastContainer />
  
    </div>
  );
}

export default App;
