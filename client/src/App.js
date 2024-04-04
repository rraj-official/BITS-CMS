import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './navbar/Navbar';
import Registered_complaints from './pages/Registered_complaints';
import Admin from './pages/Admin';
import New_complaint from './pages/New_complaint';
import Technician from './pages/Technician';
import AdminLogin from './pages/AdminLogin';
import Footer from './footer/Footer';
import TestBackend from './pages/TestBackend';

const AuthContext = createContext();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState(null);

  return (
    <div className='min-h-screen flex flex-col'>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loginData, setLoginData }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/adminlogin' element={<AdminLogin />} />
            <Route path='/past_complaints' element={<Registered_complaints />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/new_complaint' element={<New_complaint />} />
            <Route path='/technician' element={<Technician />} />
            <Route path='/testbackend' element={<TestBackend />} />
          </Routes>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export { AuthContext, App as default };
