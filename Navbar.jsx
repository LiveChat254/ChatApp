import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const currentUser = {
    name: filteredUsers,
    avatar: 'https://example.com/avatar.jpg',
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const usersRef = collection(db, 'users'); 
      const q = query(usersRef, where('name', '==', searchQuery));
      const querySnapshot = await getDocs(q);
      const foundUsers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFilteredUsers(foundUsers);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []); 

  return (
    <div className="navbar bg-blue-600 mb-2 fixed top-0 left-0 right-0 p-4 flex justify-between items-start  w-full mr-36">
      <span className="logo text-white text-2xl font-bold">
        Live<span className='text-4xl text-yellow-400'>Chat<span className='text-black'>2</span><span className='text-red-600'>5</span><span className='text-green-600'>4</span></span>
      </span>
      <div className="user flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search users"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-2 py-1 
          focus:outline-none focus:border-blue-400 cursor-pointer relative"
        />
        <button
          className="px-4 py-1 bg-blue-400 text-white font-semibold rounded-md 
          hover:bg-blue-400 hover:text-white focus:outline-none focus:bg-blue-400 focus:text-white"
          onClick={handleSearch}
        >
          Search
        </button>
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-white">{currentUser.name}</span>
        <button onClick={() =>signOut(auth)} className="px-2 py-1 bg-white text-blue-400 font-semibold 
        rounded-md hover:bg-blue-400 hover:text-white focus:outline-none focus:bg-blue-400 
        focus:text-white ">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;