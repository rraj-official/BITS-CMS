import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './navbar/Navbar';
import Registered_complaints from './pages/Registered_complaints';
import Admin from './pages/Admin';
import New_complaint from './pages/New_complaint';
import Technician from './pages/Technician';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/past_complaints' element={<Registered_complaints />}/>
          <Route path='/admin' element = {<Admin />}/>
          <Route path='/new_complaint' element = {<New_complaint />}/>
          <Route path='/technician' element={<Technician />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
