import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './navbar/Navbar';
import Registered_complaints from './pages/Registered_complaints';
import Admin from './pages/Admin';
import StudentsComplaints from './pages/StudentsComplaints'
import StaffComplaints from './pages/StaffComplaints.jsx';
import New_complaint from './pages/New_complaint';
import Technician from './pages/Technician';
import AdminLogin from './pages/AdminLogin';
import Footer from './footer/Footer';
import TestBackend from './pages/TestBackend';
import Staff_new_complaints from './pages/Staff_new_complaints.jsx';
import Staff_registered_complaints from './pages/Staff_registered_complaints.jsx';
import {TechnicianContext} from './TechnicianContext.js';
//export const TechnicianContext = React.createContext("");

export default function App() {
  const [technicianData, updateTechnicianData]=React.useState([])
  
  return (
    <TechnicianContext.Provider value={{technicianData, updateTechnicianData}}>
    <div className='min-h-screen flex flex-col'>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/adminlogin' element={<AdminLogin />} />
            <Route path='/past_complaints' element={<Registered_complaints />} />
            <Route path='/staff_past_complaints' element={<Staff_registered_complaints />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/students_complaints' element={<StudentsComplaints />} />
            <Route path='/staff_complaints' element={<StaffComplaints />} />
            <Route path='/new_complaint' element={<New_complaint />} />
            <Route path='/staff_new_complaint' element={<Staff_new_complaints />} />
            <Route path='/technician' element={<Technician />} />
            <Route path='/testbackend' element={<TestBackend />} />
          </Routes>
          <Footer />
        </Router>
    </div>
    </TechnicianContext.Provider>
  );
}

