import React from 'react';
import Sidebar from '@/components/sidebar/SideBar';
const Layout = ({ children }) => {

  return (
    <div className='flex flex-row w-full' >
      <Sidebar />
      <div className="w-3/4 p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
