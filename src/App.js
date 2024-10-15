// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Techniques from './pages/Techniques';

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
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
