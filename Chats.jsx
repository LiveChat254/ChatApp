import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Search from './Search';
 

const Chats = () => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) { // Add a check here to ensure document exists
          setChats(doc.data());
        }
      });
      
      return () => {
        unSub();
      };
    };
    
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({type: "CHANGE_USER", payload: u});
  }

  return (
    <div className="chats grid-cols-4 mr-10 fixed top-20 bg-slate-300 left-0 w-1/3 h-full ">
      <Search/>
      {Object.entries(chats).sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} className="userChat grid items-center overflow-hidden bg-slate-400 mt-0 text-white p-4 rounded-lg">
          <img src={chat[1].userInfo.photoURL} alt="" className="w-12 h-12 rounded-full" />
          <div className="userChatInfo">
            <span className="font-semibold text-lg">{chat[1].userInfo.displayName}</span>
            <p className="text-blue-600">{chat[1].userInfo.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats
