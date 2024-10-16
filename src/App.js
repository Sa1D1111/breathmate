// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Techniques from './pages/Techniques';
import CustomBreathing from './pages/CustomBreathing'; // Import the new page


function App() {
  return (
    <Router>
      <div>
        <TopNavbar />
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/techniques" element={<Techniques />} />
              <Route path="/custom-breathing" element={<CustomBreathing />} /> {/* New route */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
