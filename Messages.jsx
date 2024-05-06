import { useContext, useEffect, useState } from 'react'
import React  from 'react'
import Message from './Message'
import { onSnapshot, doc } from 'firebase/firestore'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const {data} = useContext(ChatContext);

  useEffect (() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId])

  return (
    <div  className='m-10 grid-cols-4'>
      {messages.map(m =>(
        <Message Message={m} key= {m.id}/>
      ))}
            
    </div>
  );
};

export default Messages