import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Chats from './components/Chats';

const HomeFeed = () => {
  
  const isAuthenticated = true; 
  
  // Redirect if user is not authenticated
  if (!isAuthenticated) {
    return <Link to="/login" />;
  }

  return (
    <div className="home bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2">
            <Sidebar />
          </div>
          <div className="col-span-7 mt-36">
            <Chat />
            <Chats />
          </div>
          <div className="col-span-3">
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;