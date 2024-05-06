import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
// import image from '../assets/image1.jpg'


const Chat = () => {
  const {data} = useContext(ChatContext)
  

  return (
    <div className='chat ml-24 grid'>
        <div className="chatInfo text-white m-2">
         <span>{data.user?.displayName}</span>
         <div className="chatIcons">
            {/* <img src={image} alt="" /> */}
         </div>   
        </div>
        <Messages/>
        <div className='fixed bottom-0 left-80 right-0'>
        <Input/>
        </div>
    </div>
  )
}

export default Chat