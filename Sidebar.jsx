import React from 'react';
import Navbar from './Navbar';
import Chats from './Chats';

const Sidebar = () => {
  return (
    <div className="flex flex-row mt-40">
      <div className="flex-none mr-auto">
        <Navbar />
      </div>
      <div className="flex-none mr-auto">
      </div>
      <div className="flex-1 ml-auto">
        <Chats />
      </div>
    </div>
  );
}

export default Sidebar;