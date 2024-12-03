import React from 'react';
import TopNavbar from './TopNavbar';
import GlobalMusicPlayer from './GlobalMusicPlayer';

const Layout = ({ children }) => {
  return (
    <div>
      <TopNavbar />
      <GlobalMusicPlayer />
      <div className="main-container">{children}</div>
    </div>
  );
};

export default Layout;
