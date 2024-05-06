
import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }) => {
  const { text, img, senderId } = message;

  PropTypes.checkPropTypes(
    {
      message: PropTypes.shape({
      text: PropTypes.string.isRequired,
      senderId: PropTypes.string.isRequired,
      img: PropTypes.string, // Optional prop
      }).isRequired,
    },
    { message },
    'prop',
    'Message'
  );

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref} className={`message ${senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo flex items-center mr-2">
        <img src={senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" className="w-8 h-8 rounded-full" />
        <span className="text-sm text-blue-600  ml-2">Just now</span>
      </div>
      <div className="messageContent bg-blue-300 p-2 rounded-lg">
        {text && <p className="text-blue-600">{text}</p>}
        {img && <img src={img} alt="" className="w-32 h-32 mt-2" />}
      </div>
    </div>
  );
};

// Define prop types for the Message component
Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
    img: PropTypes.string,
  }).isRequired,
};

export default Message;

