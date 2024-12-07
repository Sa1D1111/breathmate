import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import Home from './pages/Home';
import Techniques from './pages/Techniques';
import CustomBreathing from './pages/CustomBreathing';
import WaterBreath from './pages/WaterBreath'; // Import the new page
import BoxBreathing from './pages/BoxBreathing'; // Import Box Breathing
import Breathing478 from './pages/Breathing478'; // Import Box Breathing
import AlternateNostril from './pages/AlternateNostril'; // Adjust the path based on your file structure
import Help from './pages/Help'; // Adjust the path based on your file structure



function App() {
  return (
    <Router>
      <div>
        <TopNavbar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/techniques" element={<Techniques />} />
            <Route path="/custom-breathing" element={<CustomBreathing />} />
            <Route path="/water-breathing" element={<WaterBreath />} /> {/* New route */}
            <Route path="/box-breathing" element={<BoxBreathing />} /> {/* New route */}
            <Route path="/478-breathing" element={<Breathing478 />} /> {/* New route */}
            <Route path="/alternate-nostril" element={<AlternateNostril />} /> {/* New route */}
            <Route path="/help" element={<Help />} /> {/* New route */}






          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
