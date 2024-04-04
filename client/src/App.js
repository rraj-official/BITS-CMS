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
function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Router>
        <Navbar />
        <Routes>
        <Route path='/' element={<Login />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/adminlogin' element={<AdminLogin />}/>
          <Route path='/past_complaints' element={<Registered_complaints />}/>
          <Route path='/admin' element = {<Admin />}/>
          <Route path='/new_complaint' element = {<New_complaint />}/>
          <Route path='/technician' element={<Technician />}/>
          <Route path='/testbackend' element={<TestBackend />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
