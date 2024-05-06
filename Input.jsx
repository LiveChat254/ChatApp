
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { Timestamp, arrayUnion } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import storage from Firebase
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../firebase'; // Import storage from your firebase configuration file


const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid()); // Use storage from Firebase
      const uploadTask = uploadBytesResumable(storageRef, img);
  
      uploadTask.on(
        (error) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: "" // Empty string or null, depending on your data model
        })
      });
    }
  
    // Update userChats document for the current user
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    });
    // Update userChats document for the data.currentUser (assuming it's a different user)
    await updateDoc(doc(db, "userChats", data.currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    });
  
    // Reset text and img state after sending
    setText("");
    setImg(null);
  };

  return (
    <div className="input flex items-center justify-between bg-gray-100 p-4 rounded-lg">
      <input
        onChange={e => setText(e.target.value)}
        value={text}
        type="text"
        placeholder="Message ..."
        className="flex-grow px-4 py-2 mr-4 ml-32 bg-white border text-xl border-gray-300 rounded-md 
        focus:outline-none focus:border-blue-300"
      />
      <div className="send flex items-center space-x-4">
        <label htmlFor="file" className="cursor-pointer">
          <img src="" alt="" className="w-8 h-8" />
        </label>
        <input type="file" style={{ display: 'none' }} id="file" onChange={e => setImg(e.target.files[0])} />
        <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-500 
        focus:outline-none focus:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
